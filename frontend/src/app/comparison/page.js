"use client"
import { useState } from 'react';
import axios from 'axios';
import Compare from '@/components/Compare';

const Comparison = () => {
    const [inputData, setInputData] = useState("");
    const [name_amzn, setNameAmzn] = useState("");
    const [price_amzn, setPriceAmzn] = useState("");
    const [image_amzn, setImageAmzn] = useState("");
    const [rating_amzn, setRatingAmzn] = useState("");
    const [reviews_amzn, setReviewsAmzn] = useState("");
    const [name_flip, setNameFlip] = useState("");
    const [price_flip, setPriceFlip] = useState("");
    const [image_flip, setImageFlip] = useState("");
    const [rating_flip, setRatingFlip] = useState("");
    const [reviews_flip, setReviewsFlip] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameAmzn("")
        setPriceAmzn("")
        setImageAmzn("")
        setRatingAmzn("")
        setReviewsAmzn("")
        setNameFlip("")
        setPriceFlip("")
        setImageFlip("")
        setRatingFlip("")
        setReviewsFlip("")

        try {
            const response_a = await axios.post('/api/input/compare?site=amazon', { inputData });
            setNameAmzn(response_a.data.name);
            setPriceAmzn(response_a.data.price);
            setImageAmzn(response_a.data.image);
            setRatingAmzn(response_a.data.rating);
            setReviewsAmzn(response_a.data.reviews);

            const response_f = await axios.post('/api/input/compare?site=flipkart', { inputData });
            setNameFlip(response_f.data.name);
            setPriceFlip(response_f.data.price);
            setImageFlip(response_f.data.image);
            setRatingFlip(response_f.data.rating);
            setReviewsFlip(response_f.data.reviews);

        } catch (error) {
            console.error("Error processing Amazon data:", error);
        }




    }
    return (
        <>
            {name_amzn && <><br /><br /><br /><br /></>}
            <div className='flex flex-col items-center justify-center h-screen border-black'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of the Product:</label>
                        <br />
                        <input type='text' name='link'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="Enter data" className="w-72 bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button type="submit">Find</button>
                </form>
                <div className=''>
                    {name_amzn && price_amzn && <Compare name_amzn={name_amzn} price_amzn={price_amzn} image_amzn={image_amzn} rating_amzn={rating_amzn} name_flip={name_flip} price_flip={price_flip} image_flip={image_flip} rating_flip={rating_flip} reviews_amzn={reviews_amzn} reviews_flip={reviews_flip} />}
                </div>
            </div>

        </>
    )
}

export default Comparison   