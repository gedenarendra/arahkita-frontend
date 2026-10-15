const rawConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  isDev: Boolean(import.meta.env.DEV),
};

export const config = Object.freeze(rawConfig);
export default config;
