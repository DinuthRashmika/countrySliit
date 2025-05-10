const FilterMenu = ({ onFilter }) => (
  // FilterMenu.js
  // This component renders a dropdown menu for filtering countries by region.
    <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded mb-4">
      <option value="">All Regions</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
  
  export default FilterMenu;
  