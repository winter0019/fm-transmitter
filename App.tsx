
import React, { useState, useMemo } from 'react';
import { LayoutGrid, Radio, Zap, Settings, Wifi, User, Menu, Bell, Search, Sparkles, Plus, Mic2, Smartphone, CarFront, RadioTower, Waves } from 'lucide-react';
import { INITIAL_DEVICES } from './constants';
import { Device, DeviceType } from './types';
import DeviceRemote from './components/DeviceRemote';
import FMTransmitter from './components/FMTransmitter';
import SmartAssistant from './components/SmartAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'remotes' | 'fm' | 'ai'>('dashboard');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = useMemo(() => {
    return INITIAL_DEVICES.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const contextString = INITIAL_DEVICES.map(d => `${d.name} (${d.brand} ${d.type})`).join(', ');

  const handleDeviceClick = (device: Device) => {
    if (device.type === DeviceType.FM_TRANSMITTER) {
      setActiveTab('fm');
    } else {
      setSelectedDevice(device);
      setActiveTab('remotes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-24 md:pb-0 selection:bg-blue-500/30">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            OMNICONTROL
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 transition-all text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white">
             <Wifi size={14} className="text-green-500 animate-pulse" /> Network Hub Active
          </button>
          <button className="p-2.5 hover:bg-slate-800 rounded-full text-slate-400 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-blue-500 transition-colors cursor-pointer">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full p-4 md:p-8 gap-8">
        
        {/* Navigation - Left Sidebar Desktop */}
        <aside className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('remotes')}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${activeTab === 'remotes' ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              <Zap size={20} /> Master Remote
            </button>
            <button 
              onClick={() => setActiveTab('fm')}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${activeTab === 'fm' ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              <Radio size={20} /> FM Link
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${activeTab === 'ai' ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
            >
              <Sparkles size={20} /> AI Smart Hub
            </button>
          </nav>

          <div className="mt-auto bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl">
            <h4 className="font-black text-[10px] text-slate-500 uppercase tracking-widest mb-3">Bridge Connectivity</h4>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold mb-5">
               <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse"></span> IR Link Stable
            </div>
            <button className="w-full py-3 bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 text-slate-400 hover:text-white">
              RESCAN NETWORK
            </button>
          </div>
        </aside>

        {/* Dynamic Content */}
        <div className="flex-1 space-y-8 min-w-0">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">System Overview</h2>
                    <p className="text-slate-500 mt-2 font-medium">Monitoring {INITIAL_DEVICES.length} linked devices.</p>
                  </div>
                  <div className="relative max-w-sm w-full">
                    <Search className="absolute left-4 top-3 text-slate-500" size={20} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a device..." 
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all font-medium text-sm" 
                    />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                 <button className="bg-slate-900 border-2 border-dashed border-slate-800 p-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-slate-800 transition-all group active:scale-95 h-full min-h-[180px]">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Plus className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-blue-400">Add Device</span>
                 </button>

                 {filteredDevices.map(device => (
                   <div 
                    key={device.id} 
                    onClick={() => handleDeviceClick(device)}
                    className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 rounded-[2.5rem] cursor-pointer transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] group flex flex-col justify-between min-h-[180px]"
                   >
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-slate-800 rounded-3xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:scale-110 group-hover:text-white transition-all shadow-inner">
                          {device.icon}
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${device.status === 'online' ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500 opacity-50'}`}>
                          {device.status}
                        </div>
                     </div>
                     <div>
                       <h3 className="font-black text-lg group-hover:text-blue-400 transition-colors leading-tight">{device.name}</h3>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{device.brand}</p>
                     </div>
                   </div>
                 ))}
               </div>

               {/* Smart Scenes Quick Toggle */}
               <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/10 border border-blue-500/20 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={120} />
                 </div>
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-blue-400/30">
                      <Sparkles className="text-white" size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">AI Automation: Movie Night</h3>
                      <p className="text-slate-400 mt-1 max-w-md font-medium">Automatically dims Mood Lights, powers up Cinema Bar, DStv, and sets AC to sleep mode.</p>
                    </div>
                 </div>
                 <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95 shrink-0 relative z-10">
                    Execute Scene
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'remotes' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
               <div className="xl:col-span-7 space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black tracking-tight">Remote Console</h2>
                    <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex gap-1">
                       <button className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest">Active</button>
                       <button className="px-4 py-2 hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500">History</button>
                    </div>
                 </div>
                 
                 <div className="flex flex-wrap gap-2 pb-2">
                   {INITIAL_DEVICES.filter(d => d.type !== DeviceType.FM_TRANSMITTER).map(device => (
                     <button 
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className={`px-5 py-2.5 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${selectedDevice?.id === device.id ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'}`}
                     >
                       {device.name}
                     </button>
                   ))}
                 </div>

                 {selectedDevice ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <DeviceRemote device={selectedDevice} />
                    </div>
                 ) : (
                    <div className="h-[600px] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 bg-slate-900/30">
                      <Zap size={64} className="mb-6 opacity-10 animate-pulse" />
                      <p className="font-black text-sm uppercase tracking-widest">Select a terminal to interface</p>
                    </div>
                 )}
               </div>

               <div className="xl:col-span-5 space-y-8">
                  <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                    <h3 className="text-xl font-black tracking-tight">Diagnostics</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center"><Zap size={20} /></div>
                          <span className="text-sm font-bold text-slate-300">Daily Power Cycle</span>
                        </div>
                        <span className="text-blue-400 font-black">2.4 kWh</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-blue-600 w-3/4 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-800">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Upcoming Automation</p>
                      <div className="flex items-center gap-5 bg-slate-950 p-5 rounded-3xl border border-slate-800 hover:border-blue-500/30 transition-all cursor-default">
                        <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
                          <Settings size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm leading-tight">Bedroom Climate Control</p>
                          <p className="text-xs text-slate-500 mt-1">Triggers in 4 hours 20 mins</p>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                      </div>
                    </div>

                    <div className="p-5 bg-blue-600/5 rounded-3xl border border-blue-500/10 text-xs font-medium text-slate-400 leading-relaxed italic">
                      "Smart Suggestion: Turning off the Entertainment Hub between 1 AM and 6 AM could save 12% on your monthly energy bill."
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'fm' && (
            <div className="flex flex-col xl:flex-row gap-10 items-start max-w-5xl mx-auto w-full">
               <div className="flex-1 w-full animate-in slide-in-from-left duration-500">
                 <FMTransmitter />
               </div>
               <div className="w-full xl:w-96 space-y-8 animate-in slide-in-from-right duration-500">
                 <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                       <RadioTower className="text-blue-500" />
                       <h3 className="font-black text-lg tracking-tight">FM Sync Protocol</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        { icon: <Smartphone size={16} />, step: 1, text: "Pair your phone to the 'OmniLink' hub to feed audio into the system." },
                        { icon: <Radio size={16} />, step: 2, text: "Find a completely silent (static-only) frequency on your Car Radio." },
                        { icon: <Waves size={16} />, step: 3, text: "Match this device's broadcast frequency to that silent channel." },
                        { icon: <CarFront size={16} />, step: 4, text: "Audio will now wirelessly broadcast from this device to car via FM." }
                      ].map((item) => (
                        <li key={item.step} className="flex gap-4 items-start group">
                          <span className="w-7 h-7 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center shrink-0 font-black text-[9px] border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">{item.step}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               {item.icon}
                               <span className="text-[10px] font-black uppercase text-slate-500">Step {item.step}</span>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{item.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                 </div>

                 <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-[2rem] border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                       <Wifi className="text-green-500" size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">RF Signal Strength</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                       {[...Array(8)].map((_, i) => (
                         <div key={i} className={`flex-1 h-full ${i < 6 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                       ))}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-4 text-center font-bold uppercase tracking-[0.1em]">No Car-Bluetooth Pairing Required</p>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
                  <Sparkles className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" size={40} /> AI Command Center
                </h2>
                <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Gemini 3 Flash Powered</span>
                </div>
              </div>
              <SmartAssistant context={contextString} />
            </div>
          )}

        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 grid grid-cols-4 px-3 py-5 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'dashboard' ? 'text-blue-500 scale-110' : 'text-slate-600'}`}
        >
          <LayoutGrid size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('remotes')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'remotes' ? 'text-blue-500 scale-110' : 'text-slate-600'}`}
        >
          <Zap size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Remotes</span>
        </button>
        <button 
          onClick={() => setActiveTab('fm')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'fm' ? 'text-blue-500 scale-110' : 'text-slate-600'}`}
        >
          <Radio size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">FM Link</span>
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'ai' ? 'text-blue-500 scale-110' : 'text-slate-600'}`}
        >
          <Sparkles size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">AI Hub</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
