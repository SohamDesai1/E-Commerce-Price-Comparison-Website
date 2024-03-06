import connect from '@/db/config'
import User from '@/models/userSchema'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        // console.log(reqBody)
        const { email, password } = reqBody

        //check user
        const user = await User.findOne({ email })
        console.log(user)
        // localStorage.setItem("id",user._id)
        const checkedpassword = await bcryptjs.compare(password, user.password)
        if (user) {
            if (checkedpassword) {
                const tokendata = {
                    id: user._id,
                    email: user.email,
                    password: user.password
                }
                const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: "1d" })
                const res = NextResponse.json({ success: true }, { status: 200 })
                res.cookies.set('token', token, { httpOnly: true })
                return res
                // res.status(200).json({ sucess: true, token })
            }
            else {
                return NextResponse.json({ error: "Password is incorrect" }, { status: 200 })
            }

        }
        else {
            return NextResponse.json({ error: "User not found" }, { status: 200 })

        }

    } catch (err) {
        return NextResponse.json({ err }, { status: 405 })
    }
}

