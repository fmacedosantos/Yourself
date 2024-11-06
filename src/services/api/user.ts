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
          
        } else {

        }
        console.error('Erro ao buscar informações:', data.message);
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
          
        } else {
          
        }
        console.error('Erro ao buscar atividades:', data.message);
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
          
        } else {
          
        }
        console.error('Erro ao buscar estatísticas:', data.message);
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
          
        } else {
          
        }
        console.error('Erro ao buscar preferências de temporizador:', data.message);
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
          const data = await response.json();
  
          if (response.ok) {
              router.replace('/(tabs)/screens/home');
          } else {
            if (Platform.OS === 'web') {
          
            } else {
              
            }
              console.error('Erro ao cadastrar atividade:', data.message || 'Ocorreu um erro.');
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