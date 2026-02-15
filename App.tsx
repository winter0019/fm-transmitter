
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutGrid, Radio, Zap, Settings, Wifi, User, Menu, Bell, Search, 
  Sparkles, Plus, Mic2, Smartphone, CarFront, RadioTower, Waves, 
  SignalHigh, Thermometer, ShieldCheck, X, Tv, Wind, Box, Lightbulb, Volume2, Power,
  Link, AlertCircle, CheckCircle2, Cpu
} from 'lucide-react';
import { INITIAL_DEVICES } from './constants';
import { Device, DeviceType } from './types';
import DeviceRemote from './components/DeviceRemote';
import FMTransmitter from './components/FMTransmitter';
import SmartAssistant from './components/SmartAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'remotes' | 'fm' | 'ai'>('dashboard');
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [burstingId, setBurstingId] = useState<string | null>(null);
  const [isBridgeConnected, setIsBridgeConnected] = useState(false);
  const [showBridgeSetup, setShowBridgeSetup] = useState(false);

  // Load devices from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('omni_devices');
    if (saved) {
      try {
        setDevices(JSON.parse(saved));
      } catch (e) {
        setDevices(INITIAL_DEVICES);
      }
    } else {
      setDevices(INITIAL_DEVICES);
    }
    
    // Auto-connect bridge simulation after 1.5s
    const timer = setTimeout(() => setIsBridgeConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Save devices to localStorage whenever they change
  useEffect(() => {
    if (devices.length > 0) {
      localStorage.setItem('omni_devices', JSON.stringify(devices));
    }
  }, [devices]);

  const selectedDevice = useMemo(() => 
    devices.find(d => d.id === selectedDeviceId) || null
  , [devices, selectedDeviceId]);

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
    if (!isBridgeConnected) {
      setShowBridgeSetup(true);
      return;
    }
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-24 md:pb-0 selection:bg-blue-500/30 touch-manipulation">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            OMNICONTROL
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setShowBridgeSetup(true)}
            className={`hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-900/50 border rounded-full transition-all ${isBridgeConnected ? 'border-green-500/30' : 'border-red-500/30 animate-pulse'}`}
          >
            <div className="flex items-center gap-1.5">
               <span className={`w-2 h-2 rounded-full ${isBridgeConnected ? 'bg-green-500' : 'bg-red-500 animate-ping'}`}></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {isBridgeConnected ? 'Bridge Linked' : 'Bridge Error'}
               </span>
            </div>
          </button>
          
          <button className="p-2.5 hover:bg-slate-800 rounded-full text-slate-400 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full p-4 md:p-8 gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
          <div className="p-4 bg-slate-900/40 rounded-3xl border border-slate-800 mb-4">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Cpu size={16} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Core</span>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500">Bridge Connectivity</span>
                  <span className={isBridgeConnected ? 'text-green-500' : 'text-red-500'}>{isBridgeConnected ? '98%' : 'OFF'}</span>
               </div>
               <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${isBridgeConnected ? 'bg-green-500 w-[98%]' : 'bg-red-500 w-0'}`}></div>
               </div>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: <LayoutGrid size={20} />, label: 'Dashboard' },
              { id: 'remotes', icon: <Zap size={20} />, label: 'Master Remote' },
              { id: 'fm', icon: <Radio size={20} />, label: 'FM Link' },
              { id: 'ai', icon: <Sparkles size={20} />, label: 'AI Smart Hub' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dynamic Content */}
        <div className="flex-1 space-y-6 sm:space-y-8 min-w-0">
          {!isBridgeConnected && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-500" size={20} />
                  <p className="text-xs font-bold text-red-200 uppercase tracking-wide">Hardware Bridge Not Detected. Real-world control disabled.</p>
               </div>
               <button 
                onClick={() => setIsBridgeConnected(true)}
                className="text-[10px] font-black uppercase bg-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all"
               >
                 Connect Now
               </button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Infra Dashboard</h2>
                    <p className="text-slate-500 mt-2 font-medium">Controlling {devices.length} assets locally saved on this device.</p>
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

               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                 <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-slate-900 border-2 border-dashed border-slate-800 p-6 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-slate-800 transition-all group active:scale-95 h-full min-h-[160px]"
                 >
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Plus className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-blue-400">Add New Device</span>
                 </button>

                 {filteredDevices.map(device => (
                   <div 
                    key={device.id} 
                    onClick={() => handleDeviceClick(device)}
                    className={`bg-slate-900 border ${device.powerState === 'on' ? 'border-blue-500/30' : 'border-slate-800'} hover:border-blue-500/50 p-6 rounded-[2.5rem] cursor-pointer transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] group flex flex-col justify-between min-h-[180px] relative overflow-hidden`}
                   >
                     {burstingId === device.id && (
                       <div className="absolute inset-0 bg-blue-500/10 animate-pulse pointer-events-none"></div>
                     )}
                     
                     <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-2xl transition-all shadow-inner relative overflow-hidden ${device.powerState === 'on' ? 'bg-blue-600 text-white scale-110 shadow-blue-500/20' : 'bg-slate-800 text-slate-400 grayscale'}`}>
                          {device.icon}
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); togglePower(device.id); }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-75 ${device.powerState === 'on' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
                        >
                          <Power size={18} />
                        </button>
                     </div>
                     <div className="relative z-10">
                       <h3 className={`font-black text-lg transition-colors leading-tight ${device.powerState === 'on' ? 'text-white' : 'text-slate-500'}`}>{device.name}</h3>
                       <div className="flex items-center justify-between mt-1">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{device.brand}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${device.powerState === 'on' ? 'text-blue-400' : 'text-slate-600'}`}>System {device.powerState}</span>
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
                 <div className="h-[600px] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 bg-slate-900/30 p-8 text-center">
                    <Zap size={64} className="mb-6 opacity-10 animate-pulse" />
                    <p className="font-black text-sm uppercase tracking-widest">Select an active asset to view master controls</p>
                    <p className="text-xs text-slate-700 mt-2 max-w-xs">Your devices are saved locally to this laptop/phone browser.</p>
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
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg p-6 sm:p-8 relative z-10 shadow-2xl animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black tracking-tight">Sync New Asset</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddDevice} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Friendly Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newDevice.name}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Master Bedroom Hisense" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Hardware Brand</label>
                <input 
                  required
                  type="text" 
                  value={newDevice.brand}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="e.g. Hisense, Samsung, Sony..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-white"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Device Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { type: DeviceType.TV, icon: <Tv size={18} />, label: 'Smart TV' },
                    { type: DeviceType.AC, icon: <Wind size={18} />, label: 'Climate' },
                    { type: DeviceType.DECODER, icon: <Box size={18} />, label: 'Decoder' },
                    { type: DeviceType.LIGHT, icon: <Lightbulb size={18} />, label: 'Lighting' },
                    { type: DeviceType.SOUNDBAR, icon: <Volume2 size={18} />, label: 'Sound' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setNewDevice(prev => ({ ...prev, type: item.type }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${newDevice.type === item.type ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
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
                Pair with OmniBridge
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bridge Setup Modal */}
      {showBridgeSetup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setShowBridgeSetup(false)}></div>
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-md p-8 relative z-10 shadow-2xl animate-in slide-in-from-bottom-10">
             <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto border border-blue-500/30">
                   <Link size={40} className="text-blue-500" />
                </div>
                <div>
                   <h2 className="text-2xl font-black tracking-tight mb-2">OmniBridge Status</h2>
                   <p className="text-slate-400 text-sm">To control real devices from your laptop or iPhone, the OmniBridge hardware unit must be powered on and linked to your Wi-Fi network.</p>
                </div>

                <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Hardware ID</span>
                      <span className="text-[10px] font-mono text-blue-400">OB-992-X1</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Cloud Link</span>
                      <span className={`text-[10px] font-black ${isBridgeConnected ? 'text-green-500' : 'text-red-500'}`}>
                        {isBridgeConnected ? 'ENCRYPTED' : 'NOT CONNECTED'}
                      </span>
                   </div>
                </div>

                <div className="pt-4 space-y-3">
                   <button 
                    onClick={() => { setIsBridgeConnected(true); setShowBridgeSetup(false); }}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase text-xs tracking-widest"
                   >
                     {isBridgeConnected ? 'Refresh Connection' : 'Scan for Bridge'}
                   </button>
                   <button 
                    onClick={() => setShowBridgeSetup(false)}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 font-black rounded-2xl transition-all active:scale-95 uppercase text-xs tracking-widest"
                   >
                     Close Utility
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 grid grid-cols-4 px-3 py-4 pb-8 z-50">
        {[
          { id: 'dashboard', icon: <LayoutGrid size={24} />, label: 'Home' },
          { id: 'remotes', icon: <Zap size={24} />, label: 'Remotes' },
          { id: 'fm', icon: <Radio size={24} />, label: 'FM Link' },
          { id: 'ai', icon: <Sparkles size={24} />, label: 'AI Hub' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${activeTab === tab.id ? 'text-blue-500' : 'text-slate-600'}`}
          >
            {tab.icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
