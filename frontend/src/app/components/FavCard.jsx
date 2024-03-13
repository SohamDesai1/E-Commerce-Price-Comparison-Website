"use client"
import Link from "next/link"
const FavCard = ({ name, a_price, f_price, image }) => {
    return (
        <>
            <div className="flex flex-col items-center px-7 pt-5 pb-16 font-bold bg-gradient-to-r from-[#033A4C] via-[#03063D] to-[#170074] text-white rounded-3xl max-w-[465px]">
                <img
                    loading="lazy"
                    src= {image}
                    className="self-stretch w-full aspect-[1.3]"
                />
                <div className="mt-4 text-2xl text-center underline">
                    {name}
                </div>
                <div className="mt-12 text-2xl whitespace-nowrap">Current price :</div>
                <div className="flex justify-between gap-5 mt-9 whitespace-nowrap">
                    <div className="text-2xl grow">Flipkart</div>
                    <img
                        loading="lazy"
                        src="arrow.png"
                        className="shrink-0 self-center mt-1 aspect-[5.56] stroke-[1px] stroke-white w-[45px]"
                    />
                    <div className="my-auto text-lg grow">Rs.{f_price}</div>
                </div>
                <div className="flex justify-between gap-5 mt-3 whitespace-nowrap">
                    <div className="text-2xl grow">Amazon</div>
                    <img
                        loading="lazy"
                        src="arrow.png"
                        className="shrink-0 self-center mt-1 aspect-[5.56] stroke-[1px] stroke-white w-[45px]"
                    />
                    <div className="text-lg grow">Rs.{a_price}</div>
                </div>
                <div className="flex gap-3.5 px-5 py-3.5 mt-14 text-lg font-semibold text-black bg-cyan-400 rounded-2xl">
                    <Link href={"/chart"}> <div className="flex-auto">Check Graph</div></Link>
                </div>
            </div>
        </>
    )
}

export default FavCard