// src/services/authUserService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebase-init.js';
import { router } from 'expo-router';
import { Alert, Platform } from 'react-native';
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

const showAlert = (message: string) => {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert('Erro', message);
  }
};

export const userService = {
  
  async register(email: string, nome: string, apelido: string, senha: string) {
    try {
      const response = await fetch(ROUTES(PATHS.REGISTER_USER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nome,
          apelido,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await this.login(email, senha);
      } else {
        showAlert(data.message || 'Ocorreu um erro no cadastro.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async login(email: string, senha: string) {
    try {
        const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(email, senha);

        if (userCredential.user) {
            const token = await userCredential.user.getIdToken(true); // Gera um novo token válido
            await AsyncStorage.setItem('jwt', token);
            const loginDate = new Date().toISOString();
            await AsyncStorage.setItem('loginDate', loginDate);

            router.replace('/(tabs)/screens/home');
        }
    } catch (error) {
        const err = error as { code?: string };
        switch (err.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-email':
            case 'auth/invalid-credential':
                showAlert('Informações incorretas.');
                break;
            default:
                showAlert('Ocorreu um erro ao fazer login. Tente novamente.');
        }
    }
},

  async forgotPassword(email: string) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Sucesso', 'Um e-mail de redefinição de senha foi enviado.');
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === 'auth/user-not-found') {
        showAlert('Email inválido.');
      } else {
        showAlert('Ocorreu um erro ao enviar o e-mail de redefinição de senha.');
      }
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem('jwt');
      await AsyncStorage.removeItem('loginDate');
      router.replace('/');
    } catch (error) {
      showAlert('Não foi possível sair da conta.');
    }
  },

  async reauthenticateUser(senha: string) {
    const user = firebase.auth().currentUser;
    if (user) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email as string,
        senha
      );
      try {
        await user.reauthenticateWithCredential(credential);
        router.navigate('/(tabs)/settings');
      } catch (error) {
        showAlert('Senha incorreta. Tente novamente.');
      }
    } else {
      showAlert('Usuário não encontrado.');
    }
  },

  async checkToken(setLoading: (value: boolean) => void) {
    try {
      const user = firebase.auth().currentUser;
  
      if (user) {
        const token = await AsyncStorage.getItem('jwt');
        const loginDate = await AsyncStorage.getItem('loginDate');
  
        if (token && loginDate) {
          const now = new Date();
          const loginDateTime = new Date(loginDate);
          const diffMinutes = (Number(now) - Number(loginDateTime)) / (1000 * 60);
  
          if (diffMinutes >= 50) {
            try {
              const newToken = await user.getIdToken(true); // Renova o token
              await AsyncStorage.setItem('jwt', newToken);
              await AsyncStorage.setItem('loginDate', new Date().toISOString());
            } catch (renewError) {
              console.error('Erro ao renovar token:', renewError);
              await this.logout();
              showAlert('Sua sessão expirou. Por favor, faça login novamente.');
            }
          } else {
            router.replace('/(tabs)/screens/home'); // Navega para a tela inicial
          }
        } else {
          console.log("Opa") // Remove dados inválidos e desconecta
        }
      } else {
        console.log("Opa")
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      showAlert('Erro ao verificar autenticação. Tente novamente.');
    } finally {
      setLoading(false); // Sempre desativa o estado de carregamento
    }
  },

  // User methods
  async carregarUsuario(setInformacoes: (informacoes: Informacoes) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_USER));
      const data = await response.json();

      if (response.ok && data.dadosUsuario) {
        setInformacoes({
          nome: data.dadosUsuario.nome,
          apelido: data.dadosUsuario.apelido,
          anoRegistro: data.dadosUsuario.anoRegistro,
        });
      } else {
        showAlert('Erro ao buscar informações de usuário.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async carregarAtividades(setAtividades: (atividades: Atividade[]) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ACTIVITIES));
      const data = await response.json();

      if (response.ok) {
        setAtividades(data.dadosAtividades as Atividade[]);
      } else {
        showAlert('Erro ao buscar atividades.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async carregarResumoEstatisticas(setResumoEstatisticas: (resumo: ResumoEstatisticas) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();

      if (response.ok && data.dadosEstatisticas) {
        setResumoEstatisticas({
          ofensiva: data.dadosEstatisticas.ofensiva,
          pontos: data.dadosEstatisticas.pontos
        });
      } else {
        showAlert('Erro ao buscar estatísticas.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async carregarMelhoresEstatisticas(setMelhoresEstatisticas: (melhores: MelhoresEstatisticas) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();

      if (response.ok && data.dadosEstatisticas) {
        setMelhoresEstatisticas({
          maiorOfensiva: data.dadosEstatisticas.maiorOfensiva,
          totalPontos: data.dadosEstatisticas.totalPontos
        });
      } else {
        showAlert('Erro ao buscar estatísticas.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async carregarPreferencias(setPreferencias: (preferencias: Preferencias) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_PREFERENCES));
      const data = await response.json();

      if (response.ok && data.dadosPreferencias) {
        setPreferencias({
          preferenciaConcentracao: data.dadosPreferencias.preferenciaConcentracao,
          preferenciaDescanso: data.dadosPreferencias.preferenciaDescanso
        });
      } else {
        showAlert('Erro ao buscar preferências de temporizador.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async cadastrarAtividade(titulo: string, descricao: string, dificuldade: number, categoria: string, tempoConcentracao: number) {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          titulo,
          descricao,
          dificuldade,
          categoria,
          tempoConcentracao
        })
      };

      const response = await fetchWithAuth(ROUTES(PATHS.REGISTER_ACTIVITY), options);

      if (response.ok) {
        router.replace('/(tabs)/screens/home');
      } else {
        showAlert('Erro ao cadastrar atividade.');
      }
    } catch (error) {
      showAlert(erroServidor);
    }
  },

  async atualizarUsuario(userData: UpdateUserData) {
    try {
      // Remove undefined values from the object
      const filteredData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined && value !== '')
      );

      if (Object.keys(filteredData).length === 0) {
        return;
      }

      const options = {
        method: 'PATCH',
        body: JSON.stringify(filteredData)
      };

      const response = await fetchWithAuth(ROUTES(PATHS.UPDATE_USER), options);
      
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      showAlert(erroServidor);
      return false;
    }
  }
};