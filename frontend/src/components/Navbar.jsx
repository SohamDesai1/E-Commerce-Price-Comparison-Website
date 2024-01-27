import Link from 'next/link'
const Navbar = () => {
    return (
        <>
            <header className="text-gray-600 bg-black body-font">
                <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                    <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                        <span className="ml-3 text-xl text-white">Web Scrapper</span>
                    </a>
                    <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
                        <Link href={"/"}><h1 className="mr-5 text-white hover:text-gray-300">Home</h1></Link>
                        <Link href={'/amazon'}><h1 className="mr-5 text-white hover:text-gray-300">Amazon </h1></Link>
                        <Link href={'/flipkart'}><h1 className="mr-5 text-white hover:text-gray-300">Flipkart </h1></Link>
                        <Link href={'/comparison'}><h1 className="mr-5 text-white hover:text-gray-300">Compare </h1></Link>                    </nav>
                    <button className="inline-flex items-center px-3 py-1 mt-4 text-base text-black bg-blue-400 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
                        <Link href={"/login"}>Log in </Link>
                    </button>
                </div>
            </header>

        </>
    )
}

export default Navbar
