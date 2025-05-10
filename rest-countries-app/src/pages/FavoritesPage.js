import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (country, isFavorite) => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = [...favorites, country];
    } else {
      updatedFavorites = favorites.filter(fav => fav.cca3 !== country.cca3);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Favorite Countries</h1>
        <Link to="/" className="text-blue-600 hover:underline">← Back to all countries</Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You haven't added any favorites yet.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Browse countries
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map(country => (
            <CountryCard 
              key={country.cca3} 
              country={country} 
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
              showFavoriteButton={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;