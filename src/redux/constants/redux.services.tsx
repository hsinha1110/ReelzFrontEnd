import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000' // Android Emulator
    : 'http://192.168.1.33:3000'; // iOS Simulator

export interface ReplaceUrlData {
  [key: string]: string | number | undefined;
}

// Service routes
export const SERVICE_ROUTES = {
  LOGIN: `${BASE_URL}/oauth/login`,
} as const;

// HTTP Methods
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const;

// Utility function to replace params in URL
export const replaceUrl = (url: string, data: ReplaceUrlData): string => {
  return url.replace(/:([a-zA-Z]+)/g, (_, key) => {
    return data[key] !== undefined ? String(data[key]) : _;
  });
};
