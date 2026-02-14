
import React, { useState, useEffect } from 'react';
import { 
  Power, Volume2, Volume1, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  Home, Menu, Delete, AirVent, Thermometer, Wind, Sun, Palette, Sliders,
  Music, Radio, Mic2, Settings, Zap, Wifi, SignalLow
} from 'lucide-react';
import { Device, DeviceType } from '../types';

interface Props {
  device: Device;
}

const DeviceRemote: React.FC<Props> = ({ device }) => {
  const [temp, setTemp] = useState(22);
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(45);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Simulate IR transmission pulse
  const transmit = () => {
    setIsTransmitting(true);
    setTimeout(() => setIsTransmitting(false), 200);
  };

  const renderTVRemote = () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <button 
        onClick={() => { setIsOn(!isOn); transmit(); }} 
        className={`col-span-3 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20' : 'bg-slate-700 hover:bg-slate-600'}`}
      >
        <Power size={20} /> {isOn ? 'Power Off' : 'Power On'}
      </button>
      
      <div className="col-span-3 grid grid-cols-3 gap-2 mt-4 bg-slate-800/50 p-4 rounded-3xl shadow-inner border border-slate-700/50">
        <div />
        <button onClick={transmit} className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronUp /></button>
        <div />
        <button onClick={transmit} className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronLeft /></button>
        <button onClick={transmit} className="h-12 flex items-center justify-center bg-blue-600 rounded-xl hover:bg-blue-500 font-bold active:scale-90 transition-transform shadow-lg shadow-blue-500/20">OK</button>
        <button onClick={transmit} className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronRight /></button>
        <div />
        <button onClick={transmit} className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronDown /></button>
        <div />
      </div>

      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
        <button onClick={() => { setVolume(v => Math.min(100, v+5)); transmit(); }} className="p-2 hover:text-blue-400"><Volume2 /></button>
        <div className="w-2 h-24 bg-slate-700 rounded-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-full transition-all duration-300" style={{ height: `${volume}%` }}></div>
        </div>
        <button onClick={() => { setVolume(v => Math.max(0, v-5)); transmit(); }} className="p-2 hover:text-blue-400"><Volume1 /></button>
      </div>
      
      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
        <button onClick={transmit} className="p-2 hover:text-blue-400 font-bold">CH+</button>
        <div className="text-xl font-mono text-blue-400 font-bold">12</div>
        <button onClick={transmit} className="p-2 hover:text-blue-400 font-bold">CH-</button>
      </div>

      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
        <button onClick={transmit} className="p-2 hover:text-blue-400"><Home size={20} /></button>
        <button onClick={transmit} className="p-2 hover:text-blue-400"><Menu size={20} /></button>
        <button onClick={transmit} className="p-2 hover:text-blue-400 font-bold text-xs">EXIT</button>
      </div>
    </div>
  );

  const renderACRemote = () => (
    <div className="space-y-6 p-4">
      <button onClick={() => { setIsOn(!isOn); transmit(); }} className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-red-600' : 'bg-slate-700'}`}>
        <Power size={20} /> {isOn ? 'Turn AC Off' : 'Turn AC On'}
      </button>

      <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-[2.5rem] p-8 text-center border border-blue-500/30 relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Wind size={48} className="animate-pulse" />
        </div>
        <p className="text-sm text-blue-400 font-black uppercase tracking-widest mb-2">Cooling Mode</p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => { setTemp(t => t - 1); transmit(); }} className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 text-2xl font-bold border border-slate-700 shadow-lg">-</button>
          <span className="text-7xl font-black tracking-tighter text-white">{temp}°</span>
          <button onClick={() => { setTemp(t => t + 1); transmit(); }} className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 text-2xl font-bold border border-slate-700 shadow-lg">+</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['Auto', 'Swing', 'Turbo'].map((mode) => (
          <button key={mode} onClick={transmit} className="flex flex-col items-center gap-3 p-5 bg-slate-800/80 rounded-3xl hover:bg-slate-700 transition-all border border-slate-700 group active:scale-95">
            {mode === 'Auto' && <Wind className="text-blue-400 group-hover:scale-110 transition-transform" />}
            {mode === 'Swing' && <AirVent className="text-blue-400 group-hover:scale-110 transition-transform" />}
            {mode === 'Turbo' && <Thermometer className="text-blue-400 group-hover:scale-110 transition-transform" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDStvRemote = () => (
     <div className="grid grid-cols-3 gap-4 p-4">
        <button onClick={transmit} className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">PVR</button>
        <button onClick={transmit} className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">TV</button>
        <button onClick={transmit} className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">GUIDE</button>

        <div className="col-span-3 grid grid-cols-3 gap-2 py-8 relative">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-48 h-48 border-[20px] border-white rounded-full"></div>
           </div>
           <div className="col-start-2 flex flex-col gap-4 items-center">
              <button onClick={transmit} className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronUp /></button>
              <div className="flex gap-4">
                <button onClick={transmit} className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronLeft /></button>
                <button onClick={transmit} className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 font-black text-xl active:scale-90">OK</button>
                <button onClick={transmit} className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronRight /></button>
              </div>
              <button onClick={transmit} className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronDown /></button>
           </div>
        </div>

        <button onClick={() => { setIsOn(!isOn); transmit(); }} className={`p-5 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${isOn ? 'bg-red-600 shadow-red-500/20' : 'bg-slate-700'}`}><Power /></button>
        <button onClick={transmit} className="p-5 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 border border-slate-700 active:scale-95"><Delete /></button>
        <button onClick={transmit} className="p-5 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xs tracking-tighter border border-slate-700 active:scale-95">INFO</button>

        <div className="col-span-3 grid grid-cols-4 gap-2 mt-4">
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map(num => (
            <button key={num} onClick={transmit} className="h-12 bg-slate-900/50 rounded-xl hover:bg-slate-800 font-mono font-bold text-slate-300 border border-slate-800 active:scale-95 transition-all">{num}</button>
          ))}
        </div>
     </div>
  );

  // Added renderLightRemote to fix the missing function error
  const renderLightRemote = () => (
    <div className="space-y-8 p-6">
      <button 
        onClick={() => { setIsOn(!isOn); transmit(); }} 
        className={`w-full h-16 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-yellow-500 hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 text-slate-900' : 'bg-slate-700 hover:bg-slate-600'}`}
      >
        <Power size={20} /> {isOn ? 'Turn Lights Off' : 'Turn Lights On'}
      </button>

      <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Brightness</span>
          <span className="text-blue-400 font-mono font-bold">{brightness}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={brightness} 
          onChange={(e) => { setBrightness(parseInt(e.target.value)); transmit(); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between">
          <Sun size={16} className="text-slate-500" />
          <Sun size={24} className="text-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['Daylight', 'Warm', 'Reading', 'Night'].map((mode) => (
          <button 
            key={mode} 
            onClick={transmit} 
            className="p-5 bg-slate-800 rounded-3xl flex flex-col items-center gap-3 hover:bg-slate-700 transition-all border border-slate-700 group active:scale-95"
          >
            <Palette size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Added renderAudioRemote to fix the missing function error
  const renderAudioRemote = () => (
    <div className="space-y-8 p-6">
       <button 
         onClick={() => { setIsOn(!isOn); transmit(); }} 
         className={`w-full h-16 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20' : 'bg-slate-700 hover:bg-slate-600'}`}
       >
        <Power size={20} /> {isOn ? 'Power Off' : 'Power On'}
      </button>

      <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-700/50 flex flex-col items-center gap-6">
        <div className="flex justify-between w-full items-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">System Volume</span>
          <span className="text-blue-400 font-mono font-black text-2xl">{volume}</span>
        </div>
        
        <div className="flex gap-6 w-full">
          <button 
            onClick={() => { setVolume(v => Math.max(0, v - 5)); transmit(); }} 
            className="flex-1 h-20 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-700 border border-slate-700 shadow-xl active:scale-95 transition-all"
          >
            <Volume1 size={28} />
          </button>
          <button 
            onClick={() => { setVolume(v => Math.min(100, v + 5)); transmit(); }} 
            className="flex-1 h-20 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-700 border border-slate-700 shadow-xl active:scale-95 transition-all"
          >
            <Volume2 size={28} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['Bluetooth', 'Optical', 'HDMI ARC', 'Aux'].map((input) => (
          <button 
            key={input} 
            onClick={transmit} 
            className="p-5 bg-slate-800 rounded-3xl hover:bg-slate-700 transition-all border border-slate-700 font-black text-[10px] uppercase tracking-widest active:scale-95"
          >
            {input}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto h-[680px] flex flex-col ring-1 ring-white/5 relative">
      {/* IR Transmission Overlay */}
      <div className={`absolute top-4 right-6 pointer-events-none transition-all duration-300 z-50 ${isTransmitting ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
        <div className="flex items-center gap-2 bg-red-600/20 px-3 py-1.5 rounded-full border border-red-500/40 backdrop-blur-md">
          <Zap size={14} className="text-red-500 animate-pulse" />
          <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">IR Burst Sent</span>
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-inner ring-1 ring-white/10 relative overflow-hidden group">
            {device.icon}
            {isTransmitting && <div className="absolute inset-0 bg-red-500/10 animate-ping"></div>}
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight leading-tight">{device.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{device.brand}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isOn ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors text-slate-400"><Settings size={18} /></button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950/20">
        {device.type === DeviceType.TV && renderTVRemote()}
        {device.type === DeviceType.AC && renderACRemote()}
        {device.type === DeviceType.DECODER && renderDStvRemote()}
        {device.type === DeviceType.LIGHT && renderLightRemote()}
        {device.type === DeviceType.SOUNDBAR && renderAudioRemote()}
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-950/80 backdrop-blur-xl">
         <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <SignalLow size={14} className="text-blue-500" />
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                IR Hub v2.4 Connection Stable
              </p>
            </div>
            <div className="flex gap-1.5">
              <div className={`w-2 h-2 rounded-full transition-colors ${isTransmitting ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-blue-500'}`}></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DeviceRemote;
