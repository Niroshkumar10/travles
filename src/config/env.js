export const env = {
  useMocks: import.meta.env.VITE_USE_MOCKS !== 'false',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  appName: import.meta.env.VITE_APP_NAME ?? 'Wayfarer Travel',
  environment: import.meta.env.VITE_ENVIRONMENT ?? import.meta.env.MODE,
}
