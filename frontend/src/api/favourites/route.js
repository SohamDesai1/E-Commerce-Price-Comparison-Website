import User from '../../models/User';
import connect from '../../db/config';

connect();
export async function POST(request, response) {
    try {
        const reqBody = await request.json()
        const { productId } = reqBody;
        const { user } = request;
        const isProductInFavorites = user.favorites.includes(productId);

        if (!isProductInFavorites) {
            user.favorites.push(productId);
            await user.save();
        }

        response.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
        console.log(err)
    }
}

export async function GET(request, response) {
    const { user } = request;
    try {
        const populatedFavorites = await User.populate(user, { path: 'favorites', model: 'Product' });
        response.status(200).json({ success: true, favorites: populatedFavorites.favorites });
    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function DELETE(request) {
    const { user } = request;
    const { productId } = request.body;
    try {
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== productId);
        
    }
    catch(err){
        console.log(err)
    }
}
