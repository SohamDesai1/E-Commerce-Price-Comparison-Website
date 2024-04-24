"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Navbar = () => {
    const [token, setToken] = useState('');

    const router = useRouter();

    useEffect(() => {
        const getToken = async () => {
            const res = await axios.get("/api/getToken")
            setToken(res.data.token)
            console.log(res.data.token)
        }
        
        getToken();
    }, []);

    const logout = async () => {
        await axios.get("/api/logout")
        console.log("Logout successful")
        router.push("/");
    }

    const login = () => {
        router.push('/login')
    }
    return (
        <div className="flex justify-between gap-5 px-20 text-xl text-white bg-gray-900 rounded-none shadow-lg py-7 max-md:flex-wrap max-md:px-5">
            <div className="flex-auto my-auto italic font-bold">Trackky</div>
            <div className="flex justify-between gap-5 font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="flex justify-between flex-auto gap-5 my-auto">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/comparison'}>Compare</Link>
                    {token ? <Link className="flex-auto" href={'/favourites'} >Favourites</Link> : <div></div>}
                </div>
                {token ?
                    <button className="justify-center px-4 py-3 border-2 border-solid rounded-2xl border-sky-300" onClick={logout}>
                        Log out
                    </button>
                    : <button onClick={login} className="justify-center px-4 py-3 border-2 border-solid rounded-2xl border-sky-300">
                        Log in
                    </button>
                }
            </div>
        </div>
    );
}

export default Navbar
