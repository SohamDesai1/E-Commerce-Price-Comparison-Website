"use client"

import Link from "next/link";
import Compare from "./components/Compare";

export default function Home() {
  return (
    <>
      <section className="text-white bg-gray-900">
        <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-[88.4vh] lg:items-center">
          <img src="/bg.png" alt="" className="relative "/>
          <div className="absolute max-w-3xl mx-auto text-center top-[40%] left-[30%]">
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
              <div className="justify-center px-10 py-5 text-2xl text-center text-gray-900 whitespace-nowrap bg-cyan-400 rounded-[36px]">
                Get Started
              </div>
              <div className="justify-center px-10 py-5 text-2xl text-center text-cyan-400 whitespace-nowrap border border-cyan-400 border-solid rounded-[36px]">
                Learn more
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </section>
      
       {/* <Compare /> */}
    </>
  );
}
