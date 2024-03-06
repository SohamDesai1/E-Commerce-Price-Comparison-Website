/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"

const page = () => {
    const router = useRouter()
    const [user , setUser] = useState({
        username:"",
        email:"",
        password:""
    })

    const onSignup = async()=>{
        try{
            const response = await axios.post('/api/signup',user)
            console.log("Signup successful",response.data)
            router.push('/login')
        }catch(error){
            console.log(error.message)
            return NextResponse.json({error:error.message})
        }
    }

  return (
    <>

    <div className="flex flex-row justify-between w-[100vw]">
        <div className="lg:w-[85%] xxsm:w-[100%] bg-[#F7F8FF]">
        <div className="flex items-center justify-center h-screen xxsm:pb-5 lg:pb-0">
        <div className="flex flex-col w-auto h-auto gap-5 p-5">
            <div className="leading-10">
                <h1 className="font-semibold lg:text-3xl xxsm:text-2xl">Welcome, Create your account</h1>
                <h4 className="text-gray-400 lg:text-md">Enter your email and create a password</h4>
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <input
                    className="w-full p-3 border-2 border-gray-400 rounded-lg"
                    placeholder="Username" 
                    type="text" 
                    name="username"
                    value={user.username}
                    onChange={(e)=>setUser({...user,username:e.target.value})}
                    />
                </div>
                <div className="flex gap-5 lg:flex-row xxsm:flex-col">
                    <div>
                        <input 
                        className="w-full p-3 border-2 border-gray-400 rounded-lg"
                        placeholder="Email"
                        type="text" 
                        name="email"
                        value={user.email}
                        onChange={(e)=>setUser({...user,email:e.target.value})}
                        />
                    </div>
                    <div>
                        <input 
                        className="w-full p-3 border-2 border-gray-400 rounded-lg"
                        placeholder="Password"
                        type="password" 
                        name="password"
                        value={user.password}
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="py-3 font-semibold text-gray-400 bg-white border-2 border-gray-400 rounded-md px-7" onClick={onSignup}>
                    Submit
                </button>
            </div>
        </div>
    </div> 
        </div>
    </div> 
    </>
  )
}

export default page
