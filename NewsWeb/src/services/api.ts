// API endpoints
const BASE_URL = 'http://localhost:5050/api';

// Types
export interface FinancialItem {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface WeatherDay {
  id: number;
  day: string;
  temp: number;
  lowTemp: number;
  highTemp: number;
  condition: string;
}

export interface Ad {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  position: string;
}

// API services
export const fetchFinancialData = async (): Promise<FinancialItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Finance`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching financial data:", error);
    throw error;
  }
};

export const fetchNewsData = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/News`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

export const fetchSecondaryNewsData = async (): Promise<NewsItem> => {
  try {
    const response = await fetch(`${BASE_URL}/News/secondaryNews`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching secondary news data:", error);
    throw error;
  }
};

export const fetchNewsById = async (id: number): Promise<NewsItem> => {
  try {
    const response = await fetch(`${BASE_URL}/News/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching news with id ${id}:`, error);
    throw error;
  }
};

export const fetchWeatherData = async (): Promise<WeatherDay[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Weather`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchAdData = async (): Promise<Ad[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Ads`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ad data:", error);
    throw error;
  }
};

export const fetchAdById = async (id: number): Promise<Ad> => {
  try {
    const response = await fetch(`${BASE_URL}/Ads/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ad with id ${id}:`, error);
    throw error;
  }
}; 