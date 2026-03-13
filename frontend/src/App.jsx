import React, { useState, useEffect } from 'react';
import { MapPin, Video, Shield, Zap, Info, Loader2 } from 'lucide-react';

// Helper component for the Attribute Bars
function StatBar({ label, value, colorClass }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <span className="text-white/40 font-bold text-[10px] uppercase w-20 tracking-wider">{label}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-[11px] font-black w-12 text-right text-white/90">
        {Math.max(0, value - 5)}-{Math.min(100, value + 5)}
      </span>
    </div>
  );
}

function App() {
  const [country, setCountry] = useState('Japan');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const countries = ['Japan', 'England', 'Brazil'];
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/players?country=${country}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        if (data.length > 0) setSelectedPlayer(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [country]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f16] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4 text-blue-500" size={48} />
        <p className="font-black uppercase tracking-widest text-sm">Accessing Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white">
      
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-green-500 text-black px-2 py-0.5 font-black text-xs rounded-sm italic">OM</div>
            <h1 className="text-lg font-black uppercase italic tracking-tighter">Scout Report</h1>
          </div>
          <div className="flex gap-2">
            {countries.map(c => (
              <button 
                key={c}
                onClick={() => setCountry(c)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 transition-all border ${
                  country === c ? 'bg-white text-black border-white' : 'text-white/40 border-white/10 hover:border-white/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 grid grid-cols-12 gap-6">
        
        {/* LEFT LIST */}
        <div className="col-span-12 lg:col-span-4 space-y-2 max-h-[80vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="mb-4">
            <h2 className="text-xl font-black uppercase italic italic text-white/90">Any Position</h2>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">First Team Prospect</p>
          </div>
          
          {players.map(player => (
            <div 
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className={`group flex items-center gap-4 p-3 cursor-pointer transition-all border-l-4 ${
                selectedPlayer?.id === player.id 
                ? 'bg-white border-blue-500 translate-x-1' 
                : 'bg-white/5 border-transparent hover:bg-white/10'
              }`}
            >
              <div className="w-12 h-12 bg-slate-800 rounded-sm flex items-center justify-center text-[10px] font-bold text-white/20 uppercase border border-white/5">
                Photo
              </div>
              <div className="flex-1">
                <h3 className={`font-black uppercase text-xs ${selectedPlayer?.id === player.id ? 'text-black' : 'text-white'}`}>
                  {player.full_name}
                </h3>
                <p className={`text-[10px] font-bold uppercase mt-0.5 ${selectedPlayer?.id === player.id ? 'text-slate-500' : 'text-white/30'}`}>
                  Age: {player.age} • {player.position}
                </p>
              </div>
              <Shield size={14} className={selectedPlayer?.id === player.id ? 'text-blue-500' : 'text-white/20'} />
            </div>
          ))}
        </div>

        {/* RIGHT DETAIL */}
        <div className="col-span-12 lg:col-span-8">
          {selectedPlayer ? (
            <div className="bg-white/5 border border-white/10 rounded-sm">
              <div className="p-8 flex justify-between items-start bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex gap-8">
                  <div className="w-32 h-40 bg-slate-800 border border-white/10 shadow-2xl flex items-center justify-center text-white/10 font-black uppercase italic">Photo</div>
                  <div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                      {selectedPlayer.full_name}
                    </h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                      <DetailRow label="Age" value={selectedPlayer.age} />
                      <DetailRow label="Height" value={`${selectedPlayer.height}cm`} />
                      <DetailRow label="Position" value={selectedPlayer.position} highlight />
                      <DetailRow label="Foot" value={selectedPlayer.preferred_foot || 'Right'} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Club</p>
                   <p className="font-black text-xs uppercase italic">VFL Bochum</p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-white/10">
                <div className="p-8 border-r border-white/10 bg-white/[0.01]">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap size={14} className="text-green-500 fill-green-500" />
                    <span className="text-green-500 font-black uppercase text-[10px] tracking-widest">Scout Analysis</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">Not Scouting</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-8 font-medium">
                    {selectedPlayer.full_name} is a technical {selectedPlayer.position}. Current report suggests a high ceiling for development in the {country} region.
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] font-black text-white/20 uppercase mb-1 tracking-widest">Market Value</p>
                      <p className="text-xl font-black italic text-white/90">€4,800,000</p>
                    </div>
                    <a href={selectedPlayer.video_url} target="_blank" className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-tighter hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
                      <Video size={14} /> Watch Highlights
                    </a>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-white/20 font-black uppercase text-[10px] mb-6 tracking-[0.2em]">Attribute Summary</h3>
                  <StatBar label="Pace" value={74} colorClass="bg-green-500" />
                  <StatBar label="Shooting" value={42} colorClass="bg-orange-500" />
                  <StatBar label="Passing" value={65} colorClass="bg-green-400" />
                  <StatBar label="Dribbling" value={68} colorClass="bg-green-400" />
                  <StatBar label="Defending" value={35} colorClass="bg-red-500" />
                  <StatBar label="Physical" value={60} colorClass="bg-yellow-500" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border border-dashed border-white/10 flex items-center justify-center text-white/20 font-black uppercase italic">
              Select a player to view report
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Small helper for detail rows
function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex gap-4 items-baseline">
      <span className="text-[9px] font-black text-white/20 uppercase w-16 tracking-widest">{label}</span>
      <span className={`text-xs font-black uppercase italic ${highlight ? 'text-blue-400' : 'text-white/90'}`}>{value}</span>
    </div>
  );
}

export default App;