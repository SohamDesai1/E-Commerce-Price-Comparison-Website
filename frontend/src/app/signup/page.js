/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import Link from "next/link"

const Signup = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignup = async () => {
        try {
            const response = await axios.post('/api/signup', user)
            console.log("Signup successful", response.data)
            router.push('/login')
        } catch (error) {
            console.log(error.message)
            return NextResponse.json({ error: error.message })
        }
    }

    return (
        <>
            <div className="flex items-center justify-center px-16 py-20 bg-gradient-to-r from-[#06001B] via-[#1C4C3F] to-[#0E2A4E] text-black max-md:px-5">
                <div className="flex flex-col py-1 mt-0 max-w-full bg-white rounded-[34px] w-[603px] max-md:mt-10">
                    <div className="self-start ml-12 text-6xl whitespace-nowrap max-md:ml-2.5 max-md:text-4xl">
                        Sign up
                    </div>
                    <div className="h-px shrink-0 mt-7 max-md:max-w-full" />
                    <div className="flex flex-col px-12 mt-8 text-3xl font-medium max-md:px-5 max-md:max-w-full">
                        <div className="max-md:max-w-full">Email</div>
                        <input
                            className="w-full p-3 border-2 border-gray-400 rounded-lg"

                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <div className="mt-8 max-md:max-w-full">Phone number</div>
                        <input
                            className="w-full p-3 border-2 border-gray-400 rounded-lg"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                        <div className="mt-8 max-md:max-w-full">Password</div>
                        <input
                            className="w-full p-3 border-2 border-gray-400 rounded-lg"

                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <button className="flex items-center justify-center px-16 py-6 mt-12 text-3xl border border-black border-solid whitespace-nowrap bg-cyan-400 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full" onClick={onSignup}>
                            Sign up
                        </button>
                        <div className="self-center text-xl underline mt-9 whitespace-nowrap">
                            <Link href={"/login"}> <span className="underline">Already have an account</span> ? Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
