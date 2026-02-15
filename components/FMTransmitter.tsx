
import React, { useState, useEffect } from 'react';
// Added Smartphone and CarFront to the imports
import { Radio, Music, Volume2, FastForward, Rewind, Play, Pause, Bluetooth, Zap, SignalHigh, Globe, Waves, Activity, Mic2, Disc, Info, CheckCircle2, Smartphone, CarFront } from 'lucide-react';
import { FM_FREQUENCIES } from '../constants';

const FMTransmitter: React.FC = () => {
  const [frequency, setFrequency] = useState(94.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isPaired, setIsPaired] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ title: "Summer Vibes Mix", artist: "DJ Omni" });
  const [showSetupGuide, setShowSetupGuide] = useState(true);

  const adjustFrequency = (val: number) => {
    const newFreq = Math.round((frequency + val) * 10) / 10;
    if (newFreq >= FM_FREQUENCIES.MIN && newFreq <= FM_FREQUENCIES.MAX) {
      setFrequency(newFreq);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const clearChannels = [88.3, 91.5, 107.9, 94.5];
      setFrequency(clearChannels[Math.floor(Math.random() * clearChannels.length)]);
      setIsScanning(false);
    }, 1500);
  };

  const togglePairing = () => {
    if (isPaired) {
      setIsPaired(false);
      setIsPlaying(false);
    } else {
      setIsScanning(true);
      setTimeout(() => {
        setIsPaired(true);
        setIsScanning(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 sm:space-y-8 max-w-md mx-auto relative overflow-hidden ring-1 ring-white/5">
      {/* Setup Guide Overlay/Tooltip */}
      {showSetupGuide && (
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-3xl p-4 mb-4 relative overflow-hidden animate-in fade-in duration-500">
           <button onClick={() => setShowSetupGuide(false)} className="absolute top-2 right-2 text-blue-500/50 hover:text-blue-500">
              <Info size={16} />
           </button>
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap size={12} /> Car Audio Quick Setup
           </h4>
           <ul className="space-y-2">
              {[
                "Pair your phone to car's Bluetooth or OmniLink Bridge.",
                "Find an empty station (static only) on your car radio.",
                "Match the MHz on this screen to your car's radio."
              ].map((step, idx) => (
                <li key={idx} className="flex gap-2 text-[10px] font-bold text-slate-300">
                   <span className="text-blue-500">{idx + 1}.</span>
                   {step}
                </li>
              ))}
           </ul>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2 tracking-tighter">
            <Radio className={isTransmitting ? 'text-blue-400 animate-pulse' : 'text-slate-600'} size={24} /> 
            FM BROADCASTER
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-blue-500' : 'bg-slate-700'}`}></span>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">RF Modulation Active</p>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border shadow-sm ${isTransmitting ? 'bg-blue-600 border-blue-400 text-white animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
          {isTransmitting ? 'On Air' : 'Standby'}
        </div>
      </div>

      {/* Phone Source Controller */}
      <div className="bg-slate-950/80 rounded-3xl p-6 border border-slate-800 shadow-inner space-y-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isPaired ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-slate-900 border border-slate-800'}`}>
                  <Bluetooth size={18} className={isPaired ? 'text-white' : 'text-slate-600'} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Link</p>
                  <h4 className="text-xs font-black">{isPaired ? 'Laptop/iPhone Linked' : 'Searching Source...'}</h4>
               </div>
            </div>
            <button 
               onClick={togglePairing}
               className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${isPaired ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
               {isPaired ? 'Unlink' : 'Connect'}
            </button>
         </div>

         {isPaired && (
           <div className="animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-slate-800/50">
                 <div className={`w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border-2 border-blue-500/30 overflow-hidden ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                    <Disc size={24} className="text-blue-500/50" />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs font-black tracking-tight">{currentTrack.title}</p>
                    <p className="text-[10px] font-bold text-slate-500">{currentTrack.artist}</p>
                 </div>
                 <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-75 transition-all"
                 >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                 </button>
              </div>
           </div>
         )}
      </div>

      {/* Frequency Master Display */}
      <div className="bg-slate-950 rounded-[2rem] p-6 sm:p-8 text-center border-2 border-slate-800 relative overflow-hidden shadow-2xl group ring-1 ring-white/5">
        <div className="absolute top-4 left-6 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
           <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stereo</span>
        </div>
        
        <div className="absolute top-4 right-6 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">RDS: Sync</span>
        </div>

        {/* Digital Frequency readout */}
        <div className="relative py-4">
          <span className={`text-6xl sm:text-8xl font-mono font-black tracking-tighter transition-all duration-300 ${isScanning ? 'blur-sm text-blue-900' : 'text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]'}`}>
            {frequency.toFixed(1)}
          </span>
          <span className="text-slate-500 ml-3 font-black text-sm sm:text-lg uppercase align-bottom">MHz</span>
        </div>
        
        {/* Visualizer bars */}
        <div className="flex justify-center gap-1 sm:gap-1.5 h-8 items-end mt-2">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-150 ${isTransmitting && isPlaying ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-slate-800'}`}
              style={{ height: isTransmitting && isPlaying ? `${20 + Math.random() * 80}%` : '15%' }}
            ></div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-90 ${isScanning ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-blue-400'}`}
          >
            <Activity size={12} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scanning...' : 'Find Clear Station'}
          </button>
        </div>
      </div>

      {/* Main Broadcast Control */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-center gap-4 sm:gap-6 relative z-10 w-full">
          <button 
            onClick={() => adjustFrequency(-0.1)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all active:scale-75 border border-slate-700 shadow-xl group"
          >
            <Rewind size={24} className="group-hover:text-blue-400 transition-colors" />
          </button>
          
          <button 
            onClick={() => setIsTransmitting(!isTransmitting)}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2.5rem] flex flex-col items-center justify-center transition-all active:scale-75 border-4 group ${isTransmitting ? 'bg-blue-600 border-blue-400 shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
          >
            <Waves size={40} className={isTransmitting ? 'text-white animate-pulse' : 'text-slate-600'} />
            <span className="text-[10px] font-black uppercase mt-2 tracking-[0.2em]">{isTransmitting ? 'Stop' : 'Broadcast'}</span>
          </button>
          
          <button 
            onClick={() => adjustFrequency(0.1)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all active:scale-75 border border-slate-700 shadow-xl group"
          >
            <FastForward size={24} className="group-hover:text-blue-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Protocol Visualization: Phone -> Transmit -> Car */}
      <div className="bg-slate-950/60 rounded-3xl p-6 border border-slate-800 relative shadow-inner">
         <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isPaired ? 'bg-blue-600/10 border-blue-500/40 shadow-[0_0_10px_rgba(37,99,235,0.2)]' : 'bg-slate-900 border-slate-800'}`}>
                <Smartphone size={18} className={isPaired ? 'text-blue-400' : 'text-slate-600'} />
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Mobile</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="h-0.5 w-3/4 bg-slate-800 relative rounded-full overflow-hidden">
                 {isTransmitting && isPlaying && (
                   <div className="absolute inset-0 bg-blue-500 w-full translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                 )}
              </div>
              <div className="flex gap-4">
                <Music size={14} className={isTransmitting && isPlaying ? 'text-blue-500 animate-bounce' : 'text-slate-800'} />
                <Radio size={14} className={isTransmitting ? 'text-blue-500 animate-pulse' : 'text-slate-800'} />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isTransmitting ? 'bg-blue-600/10 border-blue-500/40' : 'bg-slate-900 border-slate-800'}`}>
                <CarFront size={18} className={isTransmitting ? 'text-blue-400' : 'text-slate-700'} />
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Car Headunit</span>
            </div>
         </div>
         
         <div className="bg-blue-600/5 p-4 rounded-2xl border border-blue-500/10 text-center">
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
              "Mapping digital audio to <span className="text-blue-400">Low-Latency FM Radio Signal</span>."
            </p>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default FMTransmitter;
