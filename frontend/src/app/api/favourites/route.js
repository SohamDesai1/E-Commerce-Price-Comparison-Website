import User from '@/models/userSchema';
import connect from '@/db/config';
import Product from '@/models/favSchema'
import {ObjectId} from "mongoose";
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

// Connect to the database
connect();

export async function POST(req) {
    try {
        const cookie = cookies();
        const token = cookie.get('token');
        const decodedToken = jwt.verify(token.value, process.env.SECRET_KEY);
        const userId = decodedToken.id;
        const reqBody = await req.json();
        const name = reqBody.product.name;
        const a_price = reqBody.product.a_price;
        const f_price = reqBody.product.f_price;
        const image = reqBody.product.image;
        const updatedAt = reqBody.product.updatedAt;
        // console.log(a_price)
        const favProduct = await Product.findOneAndUpdate(
            { name: name },
            { user: userId, name: name, a_price: a_price, f_price: f_price, image: image, updatedAt: updatedAt },
            { upsert: true, new: true }
        );

        const user = await User.findById(userId);
        // console.log(user)
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if the favProduct is already in favorites
        const isProductInFavorites = user.favourites.includes(favProduct._id);

        if (isProductInFavorites) {
            // If the favProduct is in favorites, remove it
            user.favourites.pull(favProduct._id);
        } else {
            // If the favProduct is not in favorites, add it
            user.favourites.push(favProduct._id);
        }

        // Save the user
        await user.save();


        return NextResponse.json({
            message: "Added from Favourites",
            product: favProduct,
            user: user,
            isFav:isProductInFavorites
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function GET() {
    try {
        const cookie = cookies();
        const token = cookie.get('token');
        // console.log(token)
        const decodedToken = jwt.verify(token.value, process.env.SECRET_KEY);
        // console.log(decodedToken)
        const userId = decodedToken.id;
        const favouriteProducts = await User.findById(userId).populate('favourites');
        // console.log(favouriteProducts)
        if (favouriteProducts) {
            return NextResponse.json({
                favouriteProducts: favouriteProducts.favourites
            }, { status: 200 });
        }
        else {
            return NextResponse.json({
                favouriteProducts: "No Favourites"
            }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error: error.message
        }, { status: 500 });
    }
}