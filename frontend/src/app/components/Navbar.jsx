"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Navbar = () => {
    const [token, setToken] = useState(null);

    const getToken = async () => {
        const res = await axios.get("/api/getToken")
        setToken(res.data.token)
    }
    useEffect(() => {
        getToken();
    }, []);
    const router = useRouter();
    return (
        <>
            <header className="text-gray-600 bg-black body-font">
                <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                        <span className="ml-3 text-xl text-white">Web Scrapper</span>
                    </a>
                    <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
                        <Link href={"/"}><h1 className="mr-5 text-white hover:text-gray-300">Home</h1></Link>
                        <Link href={'/comparison'}><h1 className="mr-5 text-white hover:text-gray-300">Compare </h1></Link>
                        <Link href={'/favourites'}><h1 className="mr-5 text-white hover:text-gray-300">Favourites </h1></Link>
                    </nav>
                    {token ? (
                        <button
                            className="inline-flex items-center px-3 py-1 mt-4 text-base text-black bg-blue-400 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
                            onClick={async () => {
                                await axios.get("/api/logout")
                                console.log("Logout successful")
                                router.push("/login");
                            }}
                        >
                            Log out
                        </button>
                    ) : (
                        <Link href={"/login"}>
                            <button className="inline-flex items-center px-3 py-1 mt-4 text-base text-black bg-blue-400 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
                                Log in
                            </button>
                        </Link>
                    )}
                </div>
            </header>

        </>
    )
}

export default Navbar
