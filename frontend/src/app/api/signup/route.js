import connect from '@/db/config'
import User from '@/models/userSchema'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()

        const { username, email, password } = reqBody

        //check for user
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        //create hash password
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt)

        //create user
        const newUser = new User({
            username: username,
            email: email,
            password: hashpassword
        })

        const saveduser = await newUser.save()
        console.log(saveduser)
        return NextResponse.json({ message: "User signup successful" })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "User signup successful" }, { status: 405 })
    }
}