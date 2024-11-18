import { PATHS, ROUTES } from "@/src/constants/Routes";
import { fetchWithAuth } from "@/src/utils/fetchWithAuth";
import { router } from "expo-router";
import { Alert, Platform } from "react-native";

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
  preferenciaDescanso: number
}

interface Informacoes {
  nome: string
  apelido: string
  anoRegistro: number
}

const erroServidor = 'Encontramos problemas ao conectar com o servidor.';

export const userService = {
  async carregarUsuario(setInformacoes: (informacoes: Informacoes) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_USER));
      const data = await response.json();

      if (response.ok && data.dadosUsuario) {
        setInformacoes({
          nome: data.dadosUsuario.nome,
          apelido: data.dadosUsuario.apelido,
          anoRegistro: data.dadosUsuario.anoRegistro
        })
      } else {
        if (Platform.OS === 'web') {
          window.alert('Erro ao buscar informações de usuário.');
        } else {
          Alert.alert('Erro', 'Erro ao buscar informações de usuário.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
          window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
    }
  },

  async carregarAtividades(setAtividades: (atividades: Atividade[]) => void) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ACTIVITIES));
      const data = await response.json();

      if (response.ok) {
        setAtividades(data.dadosAtividades as Atividade[]);
      } else {
        if (Platform.OS === 'web') {
          window.alert('Erro ao buscar atividades.');
        } else {
          Alert.alert('Erro', 'Erro ao buscar atividades.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
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
        if (Platform.OS === 'web') {
          window.alert('Erro ao buscar estatísticas.');
        } else {
          Alert.alert('Erro', 'Erro ao buscar estatísticas.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
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
        if (Platform.OS === 'web') {
          window.alert('Erro ao buscar estatísticas.');
        } else {
          Alert.alert('Erro', 'Erro ao buscar estatísticas.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
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
        if (Platform.OS === 'web') {
          window.alert('Erro ao buscar preferências de temporizador.');
        } else {
          Alert.alert('Erro', 'Erro ao buscar preferências de temporizador.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
    }
  }, 

  async cadastrarAtividade(titulo: string, descricao: string, dificuldade: number, categoria: string, tempoConcentracao: number ) {
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
            if (Platform.OS === 'web') {
              window.alert('Erro ao cadastrar atividade.');
            } else {
              Alert.alert('Erro', 'Erro ao cadastrar atividade.');
            }
          }
      } catch (error) {
        if (Platform.OS === 'web') {
          window.alert(erroServidor);
        } else {
          Alert.alert('Erro', erroServidor)
        }
      }
  },
  
  async atualizarUsuario(nome: string, apelido: string, senha: string) {
    try {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({
          nome,
          apelido,
          senha
        })
      };

      const response = await fetchWithAuth(ROUTES(PATHS.UPDATE_USER), options);
      if (response.ok) {
        window.alert('Deu certo!')
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert(erroServidor);
      } else {
        Alert.alert('Erro', erroServidor)
      }
    }
  }

};