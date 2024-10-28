import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
    const token = await AsyncStorage.getItem('jwt');  // Obtenha o token armazenado

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Adiciona o JWT no cabeçalho
        ...options.headers,
    };

    return fetch(url, { ...options, headers });
}
