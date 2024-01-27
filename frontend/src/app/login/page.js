"use client"
import { useState } from "react";
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    return (
        <div className="flex">
            <div className="flex justify-center items-center h-screen border lg:w-[85%] xxsm:w-[100%] bg-[#F7F8FF]">
                <div className="flex flex-col gap-3 p-5">
                    <div className="leading-10">
                        <h1 className="font-semibold lg:text-3xl xxsm:text-2xl">Welcome back</h1>
                        <h1 className="text-gray-400 lg:text-md">Please enter your email and password</h1>
                    </div>
                    <div className="flex gap-5 lg:flex-row xxsm:flex-col">
                        <div>
                            <input
                                className="w-full p-3 border-2 border-gray-400 rounded-md"
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                className="w-full p-3 border-2 border-gray-400 rounded-md"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-3">
                        <button className="py-3 font-semibold text-gray-400 bg-white border-2 border-gray-400 rounded-md px-7" onClick={() => {}}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login