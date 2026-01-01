import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://192.168.29.88:3000';

export interface ReplaceUrlData {
  [key: string]: string | number | undefined;
}

// Service routes
export const SERVICE_ROUTES = {
  REGISTER: `${BASE_URL}/api/auth/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,
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
