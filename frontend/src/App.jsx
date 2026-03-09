import React, { useState, useEffect } from 'react';
import { MapPin, Activity, Video, Award, ChevronRight, Zap } from 'lucide-react';

function App() {
  const [country, setCountry] = useState('Japan'); 
  const [players, setPlayers] = useState([]);
  const countries = ['Japan', 'England', 'Brazil'];

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. FIXED Header - Removed distortion, extra S, and italics */}
      <header className="bg-slate-900 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/40">S</div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase">ScoutPro</h1>
              <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase">Global Talent Database</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Country Filter */}
        <div className="flex justify-center gap-3 mb-12">
          {countries.map(c => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${
                country === c 
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 scale-105' 
                : 'bg-white text-slate-500 border-2 border-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

       {/* Players Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {players.map(player => (
    <div key={player.id} className="bg-white rounded-lg border-2 border-slate-100 shadow-xl overflow-hidden flex flex-col">
      
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
            <span className="text-[10px] font-black uppercase tracking-widest">{player.position}</span>
          </div>
          <span className="text-slate-300 font-mono text-xs">#{player.id}</span>
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{player.full_name}</h2>
        
        <div className="flex items-center text-slate-400 text-sm font-bold gap-2 mb-6">
          <MapPin size={16} className="text-blue-500" /> {player.country} • {player.age}y • {player.sex}
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-[9px] uppercase text-slate-400 font-black mb-1">Physicals</p>
            <p className="text-sm font-black text-slate-700">{player.height}cm / {player.weight}kg</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-[9px] uppercase text-slate-400 font-black mb-1">Foot</p>
            <p className="text-sm font-black text-slate-700 uppercase">{player.dominant_foot || player.preferred_foot}</p>
          </div>
        </div>

        {/* Scouting Details - No more hardcoded defaults */}
        <div className="space-y-4">
          <div>
            <p className="text-[9px] uppercase text-blue-500 font-black mb-1">Main Skills</p>
            <p className="text-sm text-slate-700 font-bold">{player.main_skills}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase text-amber-500 font-black mb-1">Player Type</p>
            <p className="text-sm text-slate-700 font-medium italic">"{player.player_type}"</p>
          </div>
          <div className="pt-2">
            <p className="text-[9px] uppercase text-slate-400 font-black mb-1">Career Path</p>
            <p className="text-xs text-slate-500 leading-relaxed">{player.career_path}</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-auto p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
        <a 
          href={player.video_url || '#'} 
          target="_blank" 
          className="flex-[3] bg-slate-900 text-white py-4 rounded-xl text-[11px] font-black uppercase flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
        >
          <Video size={16} /> Watch Highlights
        </a>
        <button className="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-4 rounded-xl flex items-center justify-center">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  ))}
</div>
      </main>
    </div>
  );
}

export default App;

