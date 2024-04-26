"use client"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Compare from '@/app/components/Compare';
import Link from 'next/link';

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
    const [product, setProduct] = useState({
        name: '',
        a_price: 0,
        f_price: 0,
        image: '',
        updatedAt: Date(),
    });

    const test = () => {
        toast.success('Added to favourites!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
    const addToFavorites = async (e) => {
        e.preventDefault();
        // convert price to number

        try {
            const res = await axios.post('/api/favourites', { product });
            console.log(product.name, "Added to favourites");
            if (res.status === 200) {
                toast.success('Added to favourites!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Error adding to favourites:', error);
        }
    };
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
            setProduct({ name: (response_a.data.name).toString(), a_price: parseInt(response_a.data.price.replace(/,/g, '')), f_price: parseInt(response_f.data.price.replace(/,/g, '')), image: response_f.data.image, updatedAt: Date() })

        } catch (error) {
            console.error("Error processing Amazon data:", error);
        }

    }
    return (
        <>
            <section className="text-white bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="mb-20 text-center">
                        <h1 className="mb-4 text-2xl font-medium sm:text-3xl title-font">Compare Products!</h1>
                        <p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-gray-500s">Search and compare the prices, reviews, ratings of your favourite products across E commerce sites like Amazon and Flipkart</p>
                        <div className="flex justify-center mt-6">
                            <div className="inline-flex w-16 h-1 bg-indigo-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
                        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 text-indigo-500 bg-indigo-100 rounded-full">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="mb-3 text-lg font-medium title-font">Check Pricing</h2>
                                <p className="text-base leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 text-indigo-500 bg-indigo-100 rounded-full">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="mb-3 text-lg font-medium title-font">Add to Favourites</h2>
                                <p className="text-base leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                            </div>
                        </div>
                    </div>
                    <Link href="#section">
                        <button className="flex px-8 py-2 mx-auto mt-16 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600" >Button</button></Link>
                </div>
            </section>
            <div id='section' className='flex flex-col items-center justify-center h-screen bg-gray-900 border-black'>
                <form className='bg-white rounded-md shadow-lg' onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center p-2">
                        <input type="text" placeholder="Search Product"
                            class="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
                        <button type="submit"
                            class="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                            Search
                        </button>
                    </div>
                </form>
                <div className=''>
                    {name_amzn && price_amzn && name_flip && price_flip && <>
                        <Compare name_amzn={name_amzn} price_amzn={price_amzn} image_amzn={image_amzn} rating_amzn={rating_amzn} name_flip={name_flip} price_flip={price_flip} image_flip={image_flip} rating_flip={rating_flip} reviews_amzn={reviews_amzn} reviews_flip={reviews_flip} /> <center> <button type="button" onClick={addToFavorites} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Favourites</button></center>
                        <ToastContainer />
                    </>}

                </div>

            </div>

        </>
    )
}

export default Comparison   