import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByCode } from '../services/api';

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const data = await fetchByCode(code);
        setCountry(data[0]);

        if (data[0].borders?.length) {
          const borderPromises = data[0].borders.map(fetchByCode);
          const borderResults = await Promise.all(borderPromises);
          setBorders(borderResults.map(res => res[0]));
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCountry();
  }, [code]);

  if (!country) {
    return <p className="text-center mt-10 text-lg text-gray-500">Loading country data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-8 px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition"
      >
        ← Back to Home
      </Link>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
        {/* Flag Area */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 shadow-inner">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="h-72 w-full object-contain rounded-md"
          />
        </div>

        {/* Details Area */}
        <div className="space-y-4 text-gray-800">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>

          <div className="space-y-2">
            <p><span className="font-semibold">Official Name:</span> {country.name.official}</p>
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}</p>
            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
            <p><span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><span className="font-semibold">Timezones:</span> {country.timezones?.join(', ')}</p>
          </div>

          {/* Border countries */}
          {borders.length > 0 && (
            <div className="pt-6 border-t border-gray-300">
              <h2 className="text-lg font-semibold mb-3">Border Countries</h2>
              <div className="flex flex-wrap gap-3">
                {borders.map((borderCountry) => (
                  <Link
                    key={borderCountry.cca3}
                    to={`/country/${borderCountry.cca3}`}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-medium transition"
                  >
                    {borderCountry.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
