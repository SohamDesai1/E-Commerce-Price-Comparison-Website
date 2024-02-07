"use client"
import Link from "next/link"
const FavCard = ({ name, a_price, f_price, image }) => {
    return (
        <>
            <div className="items-center justify-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="w-56 h-64 rounded-t-lg " src={image} alt="" />
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Amazon Price : {a_price}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Flipkart Price : {f_price}</p>
                    <Link href={"/chart"}> <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Price Chart
                    </a></Link>
                </div>
            </div>
        </>
    )
}

export default FavCard