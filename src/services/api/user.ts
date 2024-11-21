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

const showAlert = (message: string) => {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert('Erro', message);
  }
};

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
        showAlert('Nenhum dado para atualizar.');
        return;
      }

      const options = {
        method: 'PATCH',
        body: JSON.stringify(filteredData)
      };

      const response = await fetchWithAuth(ROUTES(PATHS.UPDATE_USER), options);
      
      if (response.ok) {
        showAlert('Dados atualizados com sucesso!');
        return true;
      } else {
        showAlert('Erro ao atualizar dados.');
        return false;
      }
    } catch (error) {
      showAlert(erroServidor);
      return false;
    }
  }
};