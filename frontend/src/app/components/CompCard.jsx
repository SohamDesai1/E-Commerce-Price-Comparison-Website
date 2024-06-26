"use client"
import React from 'react'
import { Rating } from 'react-custom-rating-component'

function truncateString(str, maxLength) {
    if (str. length>maxLength) {
    return str. substring(0, maxLength) + "...";
    } else {
    return str;
    }
    }
const CompCard = ({ name, image, price, rating, reviews, website }) => {
    // console.log(image);
    return (
        <div className={"flex flex-col items-center px-11 py-14 bg-white border-yellow-400 border-solid shadow-lg shadow-yellow-400 border-[7px] max-w-[467px] rounded-[33px]"}>
            {
                image && <img
                src={image}
                loading=""
                className="max-w-full shadow-sm aspect-[0.79] w-[262px]"
            />
            }
            
            <div className="mt-6 text-2xl font-bold truncate whitespace-nowrap text-blue-950">
                {truncateString(name,25)}
            </div>
            <br />
            <div className="w-[382px] h-[0px] border border-zinc-500"></div>
            <div className="mt-6 text-4xl font-bold text-blue-950">{website}</div>
            <br />
            <div className="w-[382px] h-[0px] border border-zinc-500"></div>
            <div className="mt-6 text-4xl font-bold text-blue-950">Rs.{price}</div>
            <br />
            <div className="w-[382px] h-[0px] border border-zinc-500"></div>
            <br />
            <Rating
                defaultValue={rating}
                size='30px'
                spacing='10px'
                activeColor='yellow'
                readOnly
            />
            <div className="mt-6 text-4xl font-bold text-blue-950">{reviews} reviews</div>

        </div>
    )
}

export default CompCard