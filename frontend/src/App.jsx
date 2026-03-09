import React, { useState, useEffect } from 'react';
import { User, MapPin, Activity, Video, Award, Footprints } from 'lucide-react';

function App() {
  const [country, setCountry] = useState('');
  const [players, setPlayers] = useState([]);
  const countries = ['Japan', 'England', 'Brazil'];

  // This uses the Render URL if available, otherwise stays on localhost for you
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (country) {
      fetch(`${API_URL}/api/players?country=${country}`)
        .then(res => res.json())
        .then(data => setPlayers(data))
        .catch(err => console.error("Error:", err));
    }
  }, [country]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-blue-900 uppercase tracking-wider">Elite Scout</h1>
        <p className="text-gray-500 text-sm">Talent Identification Platform</p>
      </header>

      {/* Country Filter */}
      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {countries.map(c => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              country === c ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 border'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <div key={player.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
                {player.position}
              </span>
              <span className="text-gray-400 font-bold text-xs">#{player.id}</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">{player.full_name}</h2>
            <div className="flex items-center text-gray-500 text-xs gap-1 mb-4">
              <MapPin size={12} /> {player.country} • {player.age} Years Old
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-3 rounded-xl">
              <div className="text-center border-r border-gray-200">
                <p className="text-[10px] uppercase text-gray-400 font-bold">Height/Weight</p>
                <p className="text-sm font-bold text-gray-700">{player.height}cm / {player.weight}kg</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase text-gray-400 font-bold">Preferred Foot</p>
                <p className="text-sm font-bold text-gray-700">{player.preferred_foot}</p>
              </div>
            </div>

            {/* New Scouting Specifics */}
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2">
                <Activity size={16} className="text-blue-500 mt-1" />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Main Skills</p>
                  <p className="text-sm text-gray-700">{player.main_skills || 'Speed, Agility'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award size={16} className="text-orange-500 mt-1" />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Player Type</p>
                  <p className="text-sm text-gray-700">{player.player_type || 'Playmaker'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t pt-4">
              <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                <Video size={14} /> Watch Highlights
              </button>
              <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
                Full Career Path
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;