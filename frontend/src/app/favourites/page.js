"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import FavCard from '@/app/components/FavCard';

const Favourites = () => {
    const [favourites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {
            const response = await axios.get("/api/favourites");
            if (response.data) {
                setFavorites(response.data.favouriteProducts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <>
            <div className='bg-[rgb(223,249,355)]'>
                <div class="container px-5 py-24 mx-auto ">
                    <div class="flex flex-wrap w-full mb-20">
                        <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Your Favourites</h1>
                            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                        <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Your products at one place to check the pricing and compare the prices.</p>
                    </div>
                </div>
                {favourites && favourites.length == 0 ? (
                    <p>No favorite products yet.</p>
                ) : (
                    <>
                        {/* the card shouldbe in a row of 3 */}
                        <div className="grid grid-cols-3 gap-4">
                            {favourites.map((product) => (
                                <div key={product._id}>
                                    <FavCard name={product.name} image={product.image} f_price={product.f_price} a_price={product.a_price} />
                                </div>
                            ))}
                        </div>

                    </>
                )}

            </div>
        </>
    );
};


export default Favourites;
