import React, { useState, useEffect } from 'react';
import { User, MapPin, Activity } from 'lucide-react';

function App() {
  const [country, setCountry] = useState('');
  const [players, setPlayers] = useState([]);
  const countries = ['Japan', 'England', 'Brazil'];

  // Fetch players whenever the country changes
  useEffect(() => {
    if (country) {
      fetch(`http://localhost:5000/api/players?country=${country}`)
        .then(res => res.json())
        .then(data => setPlayers(data))
        .catch(err => console.error("Error fetching players:", err));
    }
  }, [country]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Pro Scout Directory</h1>
        <p className="text-gray-600">Select a country to find emerging talent</p>
      </header>

      {/* Country Selector */}
      <div className="flex justify-center gap-4 mb-10">
        {countries.map(c => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              country === c ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map(player => (
          <div key={player.id} className="bg-white rounded-xl shadow-md p-5 border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{player.full_name}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                  {player.position}
                </span>
              </div>
              <User className="text-gray-400" size={32} />
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Activity size={16} /> <span>{player.height}cm / {player.weight}kg</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> <span>{player.country}</span>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span>Age: <strong>{player.age}</strong></span>
                <span>Foot: <strong>{player.preferred_foot}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {country && players.length === 0 && (
        <p className="text-center text-gray-500">No players found in {country}.</p>
      )}
    </div>
  );
}

export default App;