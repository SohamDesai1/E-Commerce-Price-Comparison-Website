"use client"

import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="text-white bg-gray-900">
        <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-screen lg:items-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-5xl">
              TRackky.
              <br />
              <br />
              <span className="sm:block"> Keeping track of your favourite products has never been this easy. </span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 sm:text-xl/relaxed">
              Through the power of Web Scrapping we bring you the one stop tool for your next E-Commerce purchase.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/comparison"
              >
                Get Started
              </Link>
              <a
                className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
