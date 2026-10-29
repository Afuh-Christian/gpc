import { registerPlugin } from '@capacitor/core';

interface AppSettingsPlugin {
  openSettings(): Promise<void>;
}

export const AppSettings = registerPlugin<AppSettingsPlugin>('AppSettings');
