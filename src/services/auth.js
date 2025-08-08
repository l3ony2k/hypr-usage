const API_KEY_STORAGE = 'HYPRLAB_API_KEY';

export const getApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE);
};

export const setApiKey = (apiKey) => {
  localStorage.setItem(API_KEY_STORAGE, apiKey);
};

export const removeApiKey = () => {
  localStorage.removeItem(API_KEY_STORAGE);
};

export const isAuthenticated = () => {
  return !!getApiKey();
};