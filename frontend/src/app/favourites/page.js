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
        <div>
            <h1>Your Favourites</h1>
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
    );
};


export default Favourites;
