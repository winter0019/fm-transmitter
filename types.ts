
export enum DeviceType {
  TV = 'TV',
  AC = 'AC',
  DECODER = 'DECODER',
  FM_TRANSMITTER = 'FM_TRANSMITTER',
  LIGHT = 'LIGHT',
  SOUNDBAR = 'SOUNDBAR'
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  type: DeviceType;
  status: 'online' | 'offline';
  powerState: 'on' | 'off';
  icon: string;
}

export interface RemoteAction {
  label: string;
  command: string;
  icon?: string;
  color?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
