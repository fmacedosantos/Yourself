import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
    const token = await AsyncStorage.getItem('jwt');  

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  
        ...options.headers,
    };

    return fetch(url, { ...options, headers });
}
