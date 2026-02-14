
import React, { useState } from 'react';
import { 
  Power, Volume2, Volume1, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  Home, Menu, Delete, AirVent, Thermometer, Wind, Sun, Palette, Sliders,
  Music, Radio, Mic2, Settings
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

  const renderTVRemote = () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <button onClick={() => setIsOn(!isOn)} className={`col-span-3 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-red-600 hover:bg-red-500' : 'bg-slate-700 hover:bg-slate-600'}`}>
        <Power size={20} /> {isOn ? 'Power Off' : 'Power On'}
      </button>
      
      <div className="col-span-3 grid grid-cols-3 gap-2 mt-4 bg-slate-800/50 p-4 rounded-3xl shadow-inner">
        <div />
        <button className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronUp /></button>
        <div />
        <button className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronLeft /></button>
        <button className="h-12 flex items-center justify-center bg-blue-600 rounded-xl hover:bg-blue-500 font-bold active:scale-90 transition-transform shadow-lg shadow-blue-500/20">OK</button>
        <button className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronRight /></button>
        <div />
        <button className="h-12 flex items-center justify-center bg-slate-700 rounded-xl hover:bg-slate-600 active:scale-95 transition-transform"><ChevronDown /></button>
        <div />
      </div>

      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl">
        <button className="p-2 hover:text-blue-400"><Volume2 /></button>
        <div className="w-2 h-24 bg-slate-700 rounded-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-full transition-all duration-300" style={{ height: `${volume}%` }}></div>
        </div>
        <button className="p-2 hover:text-blue-400"><Volume1 /></button>
      </div>
      
      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl">
        <button className="p-2 hover:text-blue-400 font-bold">CH+</button>
        <div className="text-xl font-mono text-blue-400 font-bold">12</div>
        <button className="p-2 hover:text-blue-400 font-bold">CH-</button>
      </div>

      <div className="flex flex-col gap-4 items-center bg-slate-800/50 p-4 rounded-2xl">
        <button className="p-2 hover:text-blue-400"><Home size={20} /></button>
        <button className="p-2 hover:text-blue-400"><Menu size={20} /></button>
        <button className="p-2 hover:text-blue-400 font-bold text-xs">EXIT</button>
      </div>
    </div>
  );

  const renderACRemote = () => (
    <div className="space-y-6 p-4">
      <button onClick={() => setIsOn(!isOn)} className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isOn ? 'bg-red-600' : 'bg-slate-700'}`}>
        <Power size={20} /> {isOn ? 'Turn AC Off' : 'Turn AC On'}
      </button>

      <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-[2.5rem] p-8 text-center border border-blue-500/30 relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Wind size={48} className="animate-pulse" />
        </div>
        <p className="text-sm text-blue-400 font-black uppercase tracking-widest mb-2">Cooling Mode</p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setTemp(t => t - 1)} className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 text-2xl font-bold border border-slate-700 shadow-lg">-</button>
          <span className="text-7xl font-black tracking-tighter text-white">{temp}°</span>
          <button onClick={() => setTemp(t => t + 1)} className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 text-2xl font-bold border border-slate-700 shadow-lg">+</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['Auto', 'Swing', 'Turbo'].map((mode) => (
          <button key={mode} className="flex flex-col items-center gap-3 p-5 bg-slate-800/80 rounded-3xl hover:bg-slate-700 transition-all border border-slate-700 group active:scale-95">
            {mode === 'Auto' && <Wind className="text-blue-400 group-hover:scale-110 transition-transform" />}
            {mode === 'Swing' && <AirVent className="text-blue-400 group-hover:scale-110 transition-transform" />}
            {mode === 'Turbo' && <Thermometer className="text-blue-400 group-hover:scale-110 transition-transform" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLightRemote = () => (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl transition-all ${isOn ? 'bg-yellow-400/20 text-yellow-400' : 'bg-slate-700 text-slate-500'}`}>
            <Sun size={32} />
          </div>
          <div>
            <p className="font-black text-xl">{isOn ? 'Lights On' : 'Lights Off'}</p>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Master Bedroom</p>
          </div>
        </div>
        <button onClick={() => setIsOn(!isOn)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isOn ? 'bg-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-slate-700'}`}>
          <Power size={24} className="text-white" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Brightness</span>
          <span className="text-sm font-bold text-yellow-400">{brightness}%</span>
        </div>
        <input 
          type="range" 
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-yellow-400" 
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map(color => (
          <button 
            key={color} 
            className="w-full aspect-square rounded-2xl shadow-lg border-2 border-slate-800 active:scale-90 transition-transform"
            style={{ backgroundColor: color }}
          />
        ))}
        <button className="col-span-4 h-14 bg-slate-800 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-700 transition-colors">
          <Palette size={20} className="text-purple-400" /> Color Wheel
        </button>
      </div>
    </div>
  );

  const renderAudioRemote = () => (
    <div className="p-6 space-y-8">
      <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Music size={32} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg">Cinema Soundbar</h4>
          <p className="text-sm text-slate-400">Samsung Q-Series</p>
        </div>
        <div className="text-right">
           <div className="text-2xl font-mono font-bold text-blue-400">Vol {volume}</div>
           <div className="text-[10px] text-slate-500 font-bold uppercase">eARC Active</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="h-24 bg-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-700 transition-all border border-slate-700 active:scale-95">
          <Sliders size={24} className="text-blue-400" />
          <span className="text-xs font-bold uppercase">Equalizer</span>
        </button>
        <button className="h-24 bg-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-700 transition-all border border-slate-700 active:scale-95">
          <Radio size={24} className="text-blue-400" />
          <span className="text-xs font-bold uppercase">Inputs</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 items-center">
         <div className="flex items-center gap-8">
           <button onClick={() => setVolume(v => Math.max(0, v-5))} className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-xl active:scale-90"><Volume1 /></button>
           <button onClick={() => setIsOn(!isOn)} className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all ${isOn ? 'bg-blue-600 border-blue-400 shadow-blue-500/20' : 'bg-slate-800 border-slate-600'}`}>
             <Power size={32} className="text-white" />
           </button>
           <button onClick={() => setVolume(v => Math.min(100, v+5))} className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-xl active:scale-90"><Volume2 /></button>
         </div>
         <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Adaptive Sound Mode: ON</p>
      </div>
    </div>
  );

  const renderDStvRemote = () => (
     <div className="grid grid-cols-3 gap-4 p-4">
        <button className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">PVR</button>
        <button className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">TV</button>
        <button className="h-12 bg-slate-800 rounded-xl hover:bg-slate-700 font-bold text-blue-400 border border-slate-700 active:scale-95 transition-all">GUIDE</button>

        <div className="col-span-3 grid grid-cols-3 gap-2 py-8 relative">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-48 h-48 border-[20px] border-white rounded-full"></div>
           </div>
           <div className="col-start-2 flex flex-col gap-4 items-center">
              <button className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronUp /></button>
              <div className="flex gap-4">
                <button className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronLeft /></button>
                <button className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 font-black text-xl active:scale-90">OK</button>
                <button className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronRight /></button>
              </div>
              <button className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 active:scale-95"><ChevronDown /></button>
           </div>
        </div>

        <button onClick={() => setIsOn(!isOn)} className={`p-5 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${isOn ? 'bg-red-600 shadow-red-500/20' : 'bg-slate-700'}`}><Power /></button>
        <button className="p-5 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 border border-slate-700 active:scale-95"><Delete /></button>
        <button className="p-5 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xs tracking-tighter border border-slate-700 active:scale-95">INFO</button>

        <div className="col-span-3 grid grid-cols-4 gap-2 mt-4">
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map(num => (
            <button key={num} className="h-12 bg-slate-900/50 rounded-xl hover:bg-slate-800 font-mono font-bold text-slate-300 border border-slate-800 active:scale-95 transition-all">{num}</button>
          ))}
        </div>
     </div>
  );

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto h-[680px] flex flex-col ring-1 ring-white/5">
      <div className="bg-slate-800/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-inner ring-1 ring-white/10">
            {device.icon}
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
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
              IR Hub v2.4 Connection Stable
            </p>
         </div>
      </div>
    </div>
  );
};

export default DeviceRemote;
