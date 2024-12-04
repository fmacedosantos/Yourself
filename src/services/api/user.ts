// src/services/authUserService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebase-init.js';
import { router } from 'expo-router';
import { PATHS, ROUTES } from '@/src/constants/Routes';
import { fetchWithAuth } from '@/src/utils/fetchWithAuth';
import { decryptAES, encryptAES } from '../../utils/crypto';

interface Atividade {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
}

interface Item {
  id: string;
  icone: string;
  nome: string;
  preco: number;
}

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface MelhoresEstatisticas {
  maiorOfensiva: number;
  totalPontos: number;
}

interface Preferencias {
  preferenciaConcentracao: number;
  preferenciaDescanso: number;
}

interface Informacoes {
  nome: string;
  apelido: string;
  anoRegistro: number;
}

interface UpdateUserData {
  nome?: string;
  apelido?: string;
  novaSenha?: string;
}

interface UpdatePreferences {
  preferenciaConcentracao?: number;
  preferenciaDescanso?: number;
}

const erroServidor = 'Encontramos dificuldades ao conectar com a API.';

export async function register(email: string, nome: string, apelido: string, senha: string) { // ok
    try {
      const response = await fetch(ROUTES(PATHS.REGISTER_USER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome, apelido, senha }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { success, message } = await login(email, senha);
        router.replace('/(tabs)/screens/home');
        return { success: success, message: message };
      } else {
        return { success: false, message: data.message || 'Erro ao realizar cadastro.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function login(email: string, senha: string) { // ok
    try {
      const response = await fetch(ROUTES(PATHS.AUTHENTICATE), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      const success = data.success;
      const message = data.message;

      if (response.ok) {

        if (success) {
          const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
  
          if (userCredential.user) {
            const token = await userCredential.user.getIdToken(true);
            await AsyncStorage.setItem('jwt', token);
            await AsyncStorage.setItem('loginDate', new Date().toISOString());
            
            const encryptedEmail = encryptAES(email);
            await AsyncStorage.setItem('userEmail', encryptedEmail);

            const encryptedPassword = encryptAES(senha);
            await AsyncStorage.setItem('userPassword', encryptedPassword);

            return { success: success, message: message };
          } else {
            return { success: false, message: message || 'Erro ao autenticar usuário.' };
          }
        }  else {
          return { success: false, message: message || 'Erro ao autenticar usuário.' };
        }
        
      } else {
        return { success: false, message: message || 'Erro ao autenticar usuário.' };
      }
      
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function forgotPassword(email: string) { // ok
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return { success: true, message: 'E-mail de redefinição de senha enviado.' };
    } catch {
      return { success: false, message: 'Erro ao enviar e-mail de redefinição de senha.' };
    }
  }

  export async function logout() {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      if (jwt) {
        await AsyncStorage.removeItem('jwt');
      }
  
      const loginDate = await AsyncStorage.getItem('loginDate');
      if (loginDate) {
        await AsyncStorage.removeItem('loginDate');
      }

      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userEmail) {
        await AsyncStorage.removeItem('userEmail');
      }

      const userPassword = await AsyncStorage.getItem('userPassword');
      if (userPassword) {
        await AsyncStorage.removeItem('userPassword');
      }
  
      await firebase.auth().signOut(); 
      router.replace('/');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

  export async function reauthenticateUser(senha: string) { //ok
    const { success, message } = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }
    
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.REAUTHENTICATE), {
        method: 'POST',
        body: JSON.stringify({ senha }),
      });
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        return { success: false, message: data.message || 'Erro ao autenticar usuário.' };
      }
  
      return { success: true, message: 'Reautenticação realizada com sucesso!' };
    } catch (error) {
      console.error('Erro na reautenticação:', error); 
      return { success: false, message: erroServidor };
    }
  }

  export async function checkToken() { //ok
    const jwt = await AsyncStorage.getItem('jwt');
    const loginDate = await AsyncStorage.getItem('loginDate');
    const encryptedEmail = await AsyncStorage.getItem('userEmail');
    const encryptedPassword = await AsyncStorage.getItem('userPassword');

    if (!jwt || !loginDate || !encryptedEmail || !encryptedPassword) {
      return { success: false, message: 'Usuário não autenticado!' };
      
    }

    try {
        const response = await fetchWithAuth(ROUTES(PATHS.AUTHENTICATE_JWT), {
            method: 'POST',
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return { success: true, message: 'Usuário autenticado com sucesso!' };
        }

        if (data.message === 'Sessão expirada. Faça login novamente.') {
          let user = firebase.auth().currentUser;

          if (user) {
            try {
                const newToken = await user.getIdToken(true);
                await AsyncStorage.setItem('jwt', newToken);
                
                return { success: true, message: 'Token renovado com sucesso!' };
            } catch {
              await logout();
              return { success: false, message: 'Não foi possível renovar a sessão.' };
            }
          }
          const email = decryptAES(encryptedEmail);
          const password = decryptAES(encryptedPassword);
  
          const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
          user = userCredential.user;
          
          if (!user) {
            await logout();
            return { success: false, message: 'Sessão inválida. Faça login novamente.' };
          }
          return { success: true, message: 'Token renovado com sucesso!' };
        }

        return { success: false, message: 'Usuário não autenticado!' };
    } catch {
        await logout();
        return { success: false, message: 'Erro na verificação da sessão.' };
    }
  }

  export async function buyItem(id: string, pontos: number) {
    const { success, message } = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.BUY_ITEM), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ id, pontos }), 
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function deleteActivity(id: string) { //ok
    const { success, message } = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }
  
    try {
      const response = await fetch(ROUTES(PATHS.DELETE_ACTIVITY), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ id }), 
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        return { success: true, message: 'Atividade deletada com sucesso!' };
      } else {
        return { success: false, message: data.message };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }  

  export async function atualizarUsuario(userData: UpdateUserData) { //ok
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const filteredData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined && value !== '')
      );

      if (Object.keys(filteredData).length === 0) {
        return { success: false, message: 'Nenhum dado fornecido para atualização.' };
      }

      const response = await fetchWithAuth(ROUTES(PATHS.UPDATE_USER), {
        method: 'PATCH',
        body: JSON.stringify(filteredData),
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: 'Dados atualizados com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao atualizar dados.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function updatePreferences(preferences: UpdatePreferences) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const filteredData = Object.fromEntries(
        Object.entries(preferences).filter(([_, value]) => value !== undefined && value !== '')
      );

      if (Object.keys(filteredData).length === 0) {
        return { success: false, message: 'Nenhum dado fornecido para atualização.' };
      }

      const response = await fetchWithAuth(ROUTES(PATHS.UPDATE_PREFERENCES), {
        method: 'PATCH',
        body: JSON.stringify(filteredData),
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: 'Temporizador pomodoro atualizado com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao atualizar o temporizador.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function carregarUsuario(setInformacoes: (informacoes: Informacoes) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_USER));
      const data = await response.json();

      if (response.ok && data.data) {
        setInformacoes({
          nome: data.data.nome,
          apelido: data.data.apelido,
          anoRegistro: data.data.anoRegistro,
        });
        return { success: true, message: 'Dados carregados com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao buscar informações do usuário.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function cadastrarAtividade(titulo: string, descricao: string, dificuldade: number, categoria: string, tempoConcentracao: number) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.REGISTER_ACTIVITY), {
        method: 'POST',
        body: JSON.stringify({ titulo, descricao, dificuldade, categoria, tempoConcentracao }),
      });

      if (response.ok) {
        return { success: true, message: 'Atividade cadastrada com sucesso!' };
      } else {
        const data = await response.json();
        return { success: false, message: data.message || 'Erro ao cadastrar atividade.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function carregarAtividades(setAtividades: (atividades: Atividade[]) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ACTIVITIES));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setAtividades(data.data as Atividade[]);
        return { success: true, message: 'Atividades carregadas com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar atividades.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function getAllItems(setItems: (items: Item[]) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ITEMS));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setItems(data.data as Item[]);
        return { success: true, message: 'Itens da loja carregados com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao buscar itens da loja.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function getItems(setItems: (items: Item[]) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ITEMS_USER));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setItems(data.data as Item[]);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Erro ao buscar itens ddo usuário.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  
  export async function carregarResumoEstatisticas(setResumoEstatisticas: (resumo: ResumoEstatisticas) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setResumoEstatisticas({
          ofensiva: data.data.ofensiva,
          pontos: data.data.pontos,
        });
        return { success: true, message: 'Resumo estatístico carregado com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar resumo estatístico.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  
  export async function carregarMelhoresEstatisticas(setMelhoresEstatisticas: (melhores: MelhoresEstatisticas) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setMelhoresEstatisticas({
          maiorOfensiva: data.data.maiorOfensiva,
          totalPontos: data.data.totalPontos,
        });
        return { success: true, message: 'Melhores estatísticas carregadas com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar melhores estatísticas.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  
  export async function carregarPreferencias(setPreferencias: (preferencias: Preferencias) => void) {
    const {success, message} = await checkToken();
  
    if (!success) {
      await logout();
      return { success: false, message: message };
    }

    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_PREFERENCES));
      const data = await response.json();
  
      if (response.ok && data.data) {
        setPreferencias({
          preferenciaConcentracao: data.data.preferenciaConcentracao,
          preferenciaDescanso: data.data.preferenciaDescanso,
        });
        return { success: true, message: 'Preferências carregadas com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar preferências.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  