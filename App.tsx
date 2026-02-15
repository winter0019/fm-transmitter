
import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, Radio, Zap, Settings, Wifi, User, Menu, Bell, Search, 
  Sparkles, Plus, Mic2, Smartphone, CarFront, RadioTower, Waves, 
  SignalHigh, Thermometer, ShieldCheck, X, Tv, Wind, Box, Lightbulb, Volume2, Power
} from 'lucide-react';
import { INITIAL_DEVICES } from './constants';
import { Device, DeviceType } from './types';
import DeviceRemote from './components/DeviceRemote';
import FMTransmitter from './components/FMTransmitter';
import SmartAssistant from './components/SmartAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'remotes' | 'fm' | 'ai'>('dashboard');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [burstingId, setBurstingId] = useState<string | null>(null);

  // Derive selected device from id to ensure state freshness
  const selectedDevice = useMemo(() => 
    devices.find(d => d.id === selectedDeviceId) || null
  , [devices, selectedDeviceId]);

  // New Device Form State
  const [newDevice, setNewDevice] = useState({
    name: '',
    brand: '',
    type: DeviceType.TV
  });

  const filteredDevices = useMemo(() => {
    return devices.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, devices]);

  const contextString = devices.map(d => `${d.name} (${d.brand} ${d.type})`).join(', ');

  const getIconForType = (type: DeviceType) => {
    switch (type) {
      case DeviceType.TV: return '📺';
      case DeviceType.AC: return '❄️';
      case DeviceType.DECODER: return '📡';
      case DeviceType.LIGHT: return '💡';
      case DeviceType.SOUNDBAR: return '🔊';
      default: return '📦';
    }
  };

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.name || !newDevice.brand) return;

    const device: Device = {
      id: Date.now().toString(),
      name: newDevice.name,
      brand: newDevice.brand,
      type: newDevice.type,
      status: 'online',
      powerState: 'on',
      icon: getIconForType(newDevice.type)
    };

    setDevices(prev => [device, ...prev]);
    setIsAddModalOpen(false);
    setNewDevice({ name: '', brand: '', type: DeviceType.TV });
  };

  const togglePower = (deviceId: string) => {
    setBurstingId(deviceId);
    setTimeout(() => setBurstingId(null), 800);

    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, powerState: d.powerState === 'on' ? 'off' : 'on' } 
        : d
    ));
  };

  const handleDeviceClick = (device: Device) => {
    if (device.type === DeviceType.FM_TRANSMITTER) {
      setActiveTab('fm');
    } else {
      setSelectedDeviceId(device.id);
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
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full">
            <div className="flex items-center gap-1.5">
               <span className={`w-2 h-2 rounded-full ${burstingId ? 'bg-red-500 animate-ping' : 'bg-blue-500 animate-pulse'}`}></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IR Hub</span>
            </div>
            <div className="w-[1px] h-3 bg-slate-800"></div>
            <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FM Link</span>
            </div>
          </div>
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
        
        {/* Sidebar */}
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
        </aside>

        {/* Dynamic Content */}
        <div className="flex-1 space-y-8 min-w-0">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">Infra Dashboard</h2>
                    <p className="text-slate-500 mt-2 font-medium">Controlling {devices.length} assets via IR/FM Bridge.</p>
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
                 <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-slate-900 border-2 border-dashed border-slate-800 p-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-slate-800 transition-all group active:scale-95 h-full min-h-[180px]"
                 >
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Plus className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-blue-400">Add Device</span>
                 </button>

                 {filteredDevices.map(device => (
                   <div 
                    key={device.id} 
                    onClick={() => handleDeviceClick(device)}
                    className={`bg-slate-900 border ${device.powerState === 'on' ? 'border-blue-500/30' : 'border-slate-800'} hover:border-blue-500/50 p-6 rounded-[2.5rem] cursor-pointer transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] group flex flex-col justify-between min-h-[180px] relative overflow-hidden`}
                   >
                     {burstingId === device.id && (
                       <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none"></div>
                     )}
                     
                     <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-2xl transition-all shadow-inner relative overflow-hidden ${device.powerState === 'on' ? 'bg-blue-600 text-white scale-110 shadow-blue-500/20' : 'bg-slate-800 text-slate-400 grayscale'}`}>
                          {device.icon}
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); togglePower(device.id); }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${device.powerState === 'on' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                        >
                          <Power size={18} />
                        </button>
                     </div>
                     <div className="relative z-10">
                       <h3 className={`font-black text-lg transition-colors leading-tight ${device.powerState === 'on' ? 'text-white' : 'text-slate-500'}`}>{device.name}</h3>
                       <div className="flex items-center justify-between mt-1">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{device.brand}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${device.powerState === 'on' ? 'text-blue-400' : 'text-slate-600'}`}>{device.powerState}</span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'remotes' && (
            <div className="animate-in fade-in zoom-in duration-300">
               {selectedDevice ? (
                 <DeviceRemote 
                   device={selectedDevice} 
                   onPowerToggle={() => togglePower(selectedDevice.id)}
                 />
               ) : (
                 <div className="h-[600px] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 bg-slate-900/30">
                    <Zap size={64} className="mb-6 opacity-10 animate-pulse" />
                    <p className="font-black text-sm uppercase tracking-widest">Select a Device to Control</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'fm' && <FMTransmitter />}
          {activeTab === 'ai' && <SmartAssistant context={contextString} />}
        </div>
      </main>

      {/* Add Device Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg p-8 relative z-10 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black tracking-tight">Add New Asset</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddDevice} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Device Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newDevice.name}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Guest Room TV" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Brand</label>
                <input 
                  required
                  type="text" 
                  value={newDevice.brand}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="e.g. Hisense, Samsung..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Control Protocol</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { type: DeviceType.TV, icon: <Tv size={18} />, label: 'TV' },
                    { type: DeviceType.AC, icon: <Wind size={18} />, label: 'AC' },
                    { type: DeviceType.DECODER, icon: <Box size={18} />, label: 'Decoder' },
                    { type: DeviceType.LIGHT, icon: <Lightbulb size={18} />, label: 'Lights' },
                    { type: DeviceType.SOUNDBAR, icon: <Volume2 size={18} />, label: 'Audio' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setNewDevice(prev => ({ ...prev, type: item.type }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${newDevice.type === item.type ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {item.icon}
                      <span className="text-[10px] font-black uppercase">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-sm uppercase tracking-widest mt-4"
              >
                Sync with Hub
              </button>
            </form>
          </div>
        </div>
      )}

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
