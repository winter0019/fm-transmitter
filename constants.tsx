
import { DeviceType, Device } from './types';

export const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'Living Room TV', brand: 'Hisense', type: DeviceType.TV, status: 'online', powerState: 'on', icon: '📺' },
  { id: '2', name: 'Master AC', brand: 'Samsung', type: DeviceType.AC, status: 'online', powerState: 'on', icon: '❄️' },
  { id: '3', name: 'Entertainment Hub', brand: 'DStv', type: DeviceType.DECODER, status: 'online', powerState: 'on', icon: '📡' },
  { id: '4', name: 'Bedroom AC', brand: 'Hisense', type: DeviceType.AC, status: 'online', powerState: 'on', icon: '💨' },
  { id: '5', name: 'Car Link', brand: 'OmniLink', type: DeviceType.FM_TRANSMITTER, status: 'online', powerState: 'on', icon: '📻' },
  { id: '6', name: 'Cinema Bar', brand: 'Samsung', type: DeviceType.SOUNDBAR, status: 'online', powerState: 'off', icon: '🔊' },
  { id: '7', name: 'Mood Lights', brand: 'Philips Hue', type: DeviceType.LIGHT, status: 'online', powerState: 'on', icon: '💡' },
  { id: '8', name: 'Kitchen AC', brand: 'LG', type: DeviceType.AC, status: 'offline', powerState: 'off', icon: '🌡️' },
];

export const FM_FREQUENCIES = {
  MIN: 87.5,
  MAX: 108.0,
  STEP: 0.1
};
