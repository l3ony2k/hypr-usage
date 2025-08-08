import axios from 'axios';
import { getApiKey, removeApiKey } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.hyprlab.io/v1';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Cache management
const cache = {
  info: { data: null, timestamp: null },
  usage: { data: null, timestamp: null }
};

const isCacheValid = (cacheEntry) => {
  if (!cacheEntry.data || !cacheEntry.timestamp) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

const setCacheEntry = (key, data) => {
  cache[key] = {
    data: data,
    timestamp: Date.now()
  };
  // Also store in localStorage for persistence
  localStorage.setItem(`hyprlab_cache_${key}`, JSON.stringify(cache[key]));
};

const getCacheEntry = (key) => {
  // First check memory cache
  if (isCacheValid(cache[key])) {
    return cache[key].data;
  }
  
  // Then check localStorage
  try {
    const stored = localStorage.getItem(`hyprlab_cache_${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        cache[key] = parsed; // Update memory cache
        return parsed.data;
      }
    }
  } catch (error) {
    console.warn('Error reading cache from localStorage:', error);
  }
  
  return null;
};

const clearCache = () => {
  cache.info = { data: null, timestamp: null };
  cache.usage = { data: null, timestamp: null };
  localStorage.removeItem('hyprlab_cache_info');
  localStorage.removeItem('hyprlab_cache_usage');
};

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor to add auth header
apiClient.interceptors.request.use((config) => {
  const apiKey = getApiKey();
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeApiKey();
      clearCache();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Utility function to round money values
const roundMoney = (value) => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace('$', ''));
  }
  return parseFloat(value.toFixed(2));
};

const formatMoney = (value) => {
  return '$' + roundMoney(value).toFixed(2);
};

// API functions
export const fetchUserInfo = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = getCacheEntry('info');
    if (cached) return cached;
  }

  try {
    const response = await apiClient.get('/info');
    const data = response.data;
    
    // Process and round all money values
    const processedData = {
      ...data,
      credit_left: formatMoney(data.credit_left),
      usage: {
        prompt_usage: formatMoney(data.usage.prompt_usage),
        completion_usage: formatMoney(data.usage.completion_usage),
        audio_usage: formatMoney(data.usage.audio_usage),
        embeddings_usage: formatMoney(data.usage.embeddings_usage),
        images_usage: formatMoney(data.usage.images_usage),
        video_usage: formatMoney(data.usage.video_usage),
        total_usage: formatMoney(data.usage.total_usage),
      }
    };
    
    setCacheEntry('info', processedData);
    return processedData;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch user info');
  }
};

export const fetchUsageData = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = getCacheEntry('usage');
    if (cached) return cached;
  }

  try {
    const response = await apiClient.get('/usage');
    const data = response.data;
    
    setCacheEntry('usage', data);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch usage data');
  }
};

export const refreshAllData = async () => {
  clearCache();
  const [userInfo, usageData] = await Promise.all([
    fetchUserInfo(true),
    fetchUsageData(true)
  ]);
  return { userInfo, usageData };
};

export { roundMoney, formatMoney, clearCache };