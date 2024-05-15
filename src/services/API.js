import { API_KEY, BASE_URL } from '../config';

export const GET = async (url) => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
