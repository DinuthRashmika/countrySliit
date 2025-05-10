const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search by country name"
    onChange={(e) => onSearch(e.target.value)}
    className="p-3 border border-gray-300 rounded-2xl w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
  />
);

export default SearchBar;
