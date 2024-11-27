// src/services/authUserService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebase-init.js';
import { router } from 'expo-router';
import { PATHS, ROUTES } from '@/src/constants/Routes';
import { fetchWithAuth } from '@/src/utils/fetchWithAuth';

interface Atividade {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  dificuldade: number;
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

const erroServidor = 'Encontramos problemas ao conectar com o servidor.';

export async function register(email: string, nome: string, apelido: string, senha: string) {
    try {
      const response = await fetch(ROUTES(PATHS.REGISTER_USER), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome, apelido, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(email, senha);
        return { success: true, message: 'Cadastro realizado com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao realizar cadastro.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function login(email: string, senha: string) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
  
      if (userCredential.user) {
        const token = await userCredential.user.getIdToken(true);
        await AsyncStorage.setItem('jwt', token);
        await AsyncStorage.setItem('loginDate', new Date().toISOString());
        router.replace('/(tabs)/screens/home');
        return { success: true, message: 'Login realizado com sucesso!' };
      }
    } catch (error) {
      const err = error as { code?: string }; 
      
      console.error('Login Error:', error);
  
      const message =
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Usuário ou senha incorretos.'
          : 'Erro ao realizar login.';
      
      return { success: false, message };
    }
  }

  export async function forgotPassword(email: string) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return { success: true, message: 'E-mail de redefinição de senha enviado.' };
    } catch {
      return { success: false, message: 'Erro ao enviar e-mail de redefinição de senha.' };
    }
  }

  export async function logout() {
    try {
      await AsyncStorage.multiRemove(['jwt', 'loginDate']);
      await firebase.auth().signOut(); 
      router.replace('/');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

  export async function reauthenticateUser(senha: string) {
    try {
      const user = firebase.auth().currentUser;
      
      if (!user || !user.email) {
        return { success: false, message: 'Usuário não encontrado.' };
      }
  
      await firebase.auth().signInWithEmailAndPassword(user.email, senha);

      console.log('Tentando reautenticação com email:', user.email);
      
      return { success: true, message: 'Reautenticação realizada com sucesso!' };
    } catch (error: any) {
      
      
    console.log('Erro:', error);
    console.log('Detalhes do erro:', error.code, error.message);
      if (error.code) {
        switch (error.code) {
          case 'auth/wrong-password':
            return { success: false, message: 'Senha incorreta. Tente novamente.' };
          case 'auth/user-not-found':
            return { success: false, message: 'Usuário não encontrado.' };
          case 'auth/invalid-credential':
            return { success: false, message: 'Credenciais inválidas.' };
          default:
            return { success: false, message: 'Erro na autenticação. Tente novamente.' };
        }
      }
  
      return { success: false, message: 'Erro desconhecido na autenticação.' };
    }
  }

  export async function checkToken() {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const loginDate = await AsyncStorage.getItem('loginDate');
  
      if (!token || !loginDate) {
        return { success: false, message: 'Sessão inválida. Faça login novamente.' };
      }
  
      const now = new Date();
      const loginDateTime = new Date(loginDate);
      const diffMinutes = (Number(now) - Number(loginDateTime)) / (1000 * 60);
  
      if (diffMinutes >= 50) {
        try {
          const user = firebase.auth().currentUser;
          if (!user) {
            await logout();
            return { success: false, message: 'Usuário não autenticado.' };
          }
  
          const newToken = await user.getIdToken(true);
          await AsyncStorage.setItem('jwt', newToken);
          await AsyncStorage.setItem('loginDate', new Date().toISOString());
          return { success: true, message: 'Token renovado com sucesso!' };
        } catch (error) {
          await logout();
          return { success: false, message: 'Não foi possível renovar a sessão.' };
        }
      }
  
      return { success: true, message: 'Token válido.' };
    } catch (error) {
      await logout();
      return { success: false, message: 'Erro na verificação da sessão.' };
    }
  }

  export async function atualizarUsuario(userData: UpdateUserData) {
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

      if (response.ok) {
        return { success: true, message: 'Dados atualizados com sucesso!' };
      } else {
        const data = await response.json();
        return { success: false, message: data.message || 'Erro ao atualizar dados.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function carregarUsuario(setInformacoes: (informacoes: Informacoes) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_USER));
      const data = await response.json();

      if (response.ok && data.dadosUsuario) {
        setInformacoes({
          nome: data.dadosUsuario.nome,
          apelido: data.dadosUsuario.apelido,
          anoRegistro: data.dadosUsuario.anoRegistro,
        });
        return { success: true, message: 'Dados carregados com sucesso!' };
      } else {
        return { success: false, message: data.message || 'Erro ao buscar informações do usuário.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }

  export async function cadastrarAtividade(
    titulo: string,
    descricao: string,
    dificuldade: number,
    categoria: string,
    tempoConcentracao: number
  ) {
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
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ACTIVITIES));
      const data = await response.json();
  
      if (response.ok && data.dadosAtividades) {
        setAtividades(data.dadosAtividades as Atividade[]);
        return { success: true, message: 'Atividades carregadas com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar atividades.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  
  export async function carregarResumoEstatisticas(
    setResumoEstatisticas: (resumo: ResumoEstatisticas) => void
  ) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();
  
      if (response.ok && data.dadosEstatisticas) {
        setResumoEstatisticas({
          ofensiva: data.dadosEstatisticas.ofensiva,
          pontos: data.dadosEstatisticas.pontos,
        });
        return { success: true, message: 'Resumo estatístico carregado com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar resumo estatístico.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  
  export async function carregarMelhoresEstatisticas(
    setMelhoresEstatisticas: (melhores: MelhoresEstatisticas) => void
  ) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();
  
      if (response.ok && data.dadosEstatisticas) {
        setMelhoresEstatisticas({
          maiorOfensiva: data.dadosEstatisticas.maiorOfensiva,
          totalPontos: data.dadosEstatisticas.totalPontos,
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
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_PREFERENCES));
      const data = await response.json();
  
      if (response.ok && data.dadosPreferencias) {
        setPreferencias({
          preferenciaConcentracao: data.dadosPreferencias.preferenciaConcentracao,
          preferenciaDescanso: data.dadosPreferencias.preferenciaDescanso,
        });
        return { success: true, message: 'Preferências carregadas com sucesso!' };
      } else {
        return { success: false, message: 'Erro ao buscar preferências.' };
      }
    } catch {
      return { success: false, message: erroServidor };
    }
  }
  

