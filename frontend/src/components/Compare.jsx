"use client"
import Link from 'next/link'
import React from 'react'

const Compare = ({ name_amzn, price_amzn, image_amzn, rating_amzn, reviews_amzn, name_flip, price_flip, image_flip, rating_flip, reviews_flip }) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gradient-to-bl from-blue-50 to-violet-50">
                <div className="p-4 ">
                    <div className="flex gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                        <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg">
                            <div className="mb-2 text-xl font-bold">Amazon</div>
                            <img
                                src={image_amzn}
                                alt="Placeholder Image"
                                className="w-full h-auto rounded-md"
                            />
                            <div className="px-1 py-4 text-center">
                                <div className="mb-2 text-xl font-bold">{name_amzn}</div>

                                <p className="text-base text-gray-700">
                                    Price : {price_amzn}
                                </p>
                                <p className="text-base text-gray-700">
                                    Rating : {rating_amzn}
                                </p>
                                <p className="text-base text-gray-700">
                                    Reviews : {reviews_amzn}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg">
                            <div className="mb-2 text-xl font-bold">Flipkart</div>
                            <img
                                src={image_flip}
                                alt="Placeholder Image"
                                className="object-fill w-full h-auto rounded-md"
                            />
                            <div className="px-1 py-4 text-center">
                                <div className="mb-2 text-xl font-bold">{name_flip}</div>

                                <p className="text-base text-gray-700">
                                    Price : {price_flip}
                                </p>
                                <p className="text-base text-gray-700">
                                    Rating : {rating_flip}
                                </p>
                                <p className="text-base text-gray-700">
                                    Reviews : {reviews_flip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default Compare
