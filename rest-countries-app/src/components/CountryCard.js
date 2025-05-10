import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CountryCard = ({ country, onToggleFavorite, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    onToggleFavorite(country, newFavoriteStatus);
  };

  return (
    <Link to={`/country/${country.cca3}`} className="relative">
      {/* Favorite button */}
      <button 
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
        )}
      </button>
      
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl h-full">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {country.name.common}
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Population:</span> {country.population.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;