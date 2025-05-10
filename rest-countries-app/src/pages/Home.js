import { useEffect, useState } from 'react';
import {
  fetchAllCountries,
  fetchByName,
  fetchByRegion,
} from '../services/api';
import CountryCard from '../components/CountryCard';
import FilterMenu from '../components/FilterMenu';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalCountries: 0,
    totalLanguages: 0,
    totalRegions: 0
  });
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load countries and favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    setFavorites(savedFavorites);
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const data = await fetchAllCountries();
    setAllCountries(data);
    setFilteredCountries(data);
    setCurrentPage(1);
    
    // Calculate statistics
    const languages = new Set();
    const regions = new Set();
    
    data.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => languages.add(lang));
      }
      if (country.region) {
        regions.add(country.region);
      }
    });
    
    setStats({
      totalCountries: data.length,
      totalLanguages: languages.size,
      totalRegions: regions.size
    });
  };

  const handleSearch = async (name) => {
    setSearchQuery(name);
    setShowFavorites(false);
    if (!name) return loadCountries();
    const data = await fetchByName(name);
    setFilteredCountries(data);
    setCurrentPage(1);
  };

  const handleFilter = async (region) => {
    setShowFavorites(false);
    if (!region) return loadCountries();
    const data = await fetchByRegion(region);
    setFilteredCountries(data);
    setCurrentPage(1);
  };

  const toggleFavorite = (country) => {
    const isFavorite = favorites.some(fav => fav.cca3 === country.cca3);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.cca3 !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  };

  // Determine which countries to display
  const countriesToDisplay = showFavorites ? favorites : filteredCountries;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = countriesToDisplay.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(countriesToDisplay.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl mb-6 shadow-lg" style={{ minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="World map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
            Explore the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 drop-shadow-sm">
            Discover countries, cultures, and breathtaking destinations
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full h-14 py-3 px-6 pr-12 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="w-full md:w-48 h-14 pt-2">
              <FilterMenu onFilter={handleFilter} darkMode />
            </div>
          </div>
          
          <div className="hidden md:flex justify-center mt-12 space-x-8">
            <img 
              src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Japan"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-110 transition-transform"
            />
            <img 
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
              alt="Italy"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-110 transition-transform"
            />
            <img 
              src="https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Egypt"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:bg-gray-700 transition-colors">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Countries</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-extrabold text-white">{stats.totalCountries}</p>
            <span className="ml-2 text-blue-400 text-sm font-medium">Worldwide</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover:bg-gray-700 transition-colors">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Languages</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-extrabold text-white">{stats.totalLanguages}</p>
            <span className="ml-2 text-blue-400 text-sm font-medium">Cultural diversity</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover:bg-gray-700 transition-colors">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Regions</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-extrabold text-white">{stats.totalRegions}</p>
            <span className="ml-2 text-blue-400 text-sm font-medium">Global diversity</span>
          </div>
        </div>
      </div>

      {/* Favorites Toggle Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={toggleFavoritesView}
          className={`px-4 py-2 rounded-md font-medium ${showFavorites ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          {showFavorites ? 'Show All Countries' : `Show Favorites (${favorites.length})`}
        </button>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {currentItems.map((country) => (
          <CountryCard 
            key={country.cca3} 
            country={country} 
            darkMode 
            isFavorite={favorites.some(fav => fav.cca3 === country.cca3)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Empty State */}
      {currentItems.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          {showFavorites ? 
            "You don't have any favorite countries yet." : 
            "No countries found matching your criteria."}
        </div>
      )}

      {/* Pagination */}
      {countriesToDisplay.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <span className="font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;