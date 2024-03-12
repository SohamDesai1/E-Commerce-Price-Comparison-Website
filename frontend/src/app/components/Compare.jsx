"use client"
import Link from 'next/link'
import React from 'react'
import CompCard from './CompCard'

const Compare = ({ name_amzn, price_amzn, image_amzn, rating_amzn, reviews_amzn, name_flip, price_flip, image_flip, rating_flip, reviews_flip }) => {
    return (
        <>
            <div className='flex items-center content-center justify-center h-screen gap-6'>
                <CompCard name={name_amzn} image={image_amzn} price={price_amzn} rating={rating_amzn} reviews={reviews_amzn} website={"Amazon"} />
                <CompCard name={name_flip} image={image_flip} price={price_flip} rating={rating_flip} reviews={reviews_flip} website={"Flipkart"} />
            </div>
        </>



    )
}

export default Compare
