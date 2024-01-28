// components/Product.js
import { useState } from 'react';
import axios from 'axios';

const Product = ({ product, user }) => {
  const [isFavorite, setIsFavorite] = useState(user?.favorites.includes(product._id));

  const handleAddToFavorites = async () => {
    try {
      await axios.post('/api/favorites', { productId: product._id });
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToFavorites} disabled={isFavorite}>
        {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Product;
