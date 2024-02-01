import User from '@/models/userSchema';
import connect from '@/db/config';
import Product from '@/models/favSchema'

connect();

export async function POST(req, res) {
    try {
        const { user } = req;
        const { name, a_price, f_price, image, updatedAt } = req.body;

        const product = await Product.findOneAndUpdate(
            { name: name },
            { name: name, a_price: a_price, f_price: f_price, image: image, updatedAt: updatedAt },
            { upsert: true, new: true }
        );

        const isProductInFavorites = user.favorites.includes(product._id);

        if (isProductInFavorites) {
            user.favorites.pull(product._id);
        } else {
            user.favorites.push(product._id);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: isProductInFavorites ? 'Removed from favorites' : 'Added to favorites',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function GET(req, res) {
    try {
        const { user } = req;
        const favoriteProducts = await User.findById(user._id).populate('favorites');

        return res.status(200).json({
            success: true,
            favorites: favoriteProducts.favorites,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
