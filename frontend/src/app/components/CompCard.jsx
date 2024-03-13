"use client"
import React from 'react'
import { Rating } from 'react-custom-rating-component'

const CompCard = ({ name, image, price, rating, reviews, website }) => {
    return (
        <div className="flex flex-col items-center px-11 py-14 bg-white border-yellow-400 border-solid shadow-lg border-[7px] max-w-[467px] rounded-[33px]">
            <img
                src={image}
                loading="lazy"
                srcSet="..."
                className="max-w-full shadow-sm aspect-[0.79] w-[262px]"
            />
            <div className="mt-6 text-4xl font-bold whitespace-nowrap text-blue-950">
                {name}
            </div>
            <div className="mt-6 text-4xl font-bold text-blue-950">{website}</div>
            <div className="mt-6 text-4xl font-bold text-blue-950">{price}</div>
            <div className="mt-6 text-4xl font-bold text-blue-950">{reviews} reviews</div>
            <Rating
                defaultValue={rating}
                size='30px'
                spacing='10px'
                activeColor='yellow'
            />
        </div>
    )
}

export default CompCard