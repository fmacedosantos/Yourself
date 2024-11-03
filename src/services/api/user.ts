import { PATHS, ROUTES } from "@/src/constants/Routes";
import { fetchWithAuth } from "@/src/utils/fetchWithAuth";
import { router } from "expo-router";

interface Atividade {
  id: string;
  titulo: string;
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

export const userService = {
  async carregarAtividades(setAtividades: React.Dispatch<React.SetStateAction<Atividade[]>>) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_ACTIVITIES));
      const data = await response.json();

      if (response.ok) {
        setAtividades(data.dadosAtividades as Atividade[]);
      } else {
        console.error('Erro ao buscar atividades:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  },

  async carregarResumoEstatisticas(setResumoEstatisticas: React.Dispatch<React.SetStateAction<ResumoEstatisticas>>) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_STATS));
      const data = await response.json();

      if (response.ok && data.dadosEstatisticas) {
        setResumoEstatisticas({
          ofensiva: data.dadosEstatisticas.ofensiva,
          pontos: data.dadosEstatisticas.pontos
        });
      } else {
        console.error('Erro ao buscar estatísticas:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  },

  async carregarPreferencias(setPreferencias: React.Dispatch<React.SetStateAction<Preferencias>>) {
    try {
      const response = await fetchWithAuth(ROUTES(PATHS.SHOW_PREFERENCES));
      const data = await response.json();

      if (response.ok && data.dadosPreferencias) {
        setPreferencias({
          preferenciaConcentracao: data.dadosPreferencias.preferenciaConcentracao,
          preferenciaDescanso: data.dadosPreferencias.preferenciaDescanso
        });
      } else {
        console.error('Erro ao buscar preferências de temporizador:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }, 

  async cadastrarAtividade(
    titulo: string,
    descricao: string,
    dificuldade: number,
    categoria: string,
    tempoConcentracao: number
  ) {
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
              console.error('Erro ao cadastrar atividade:', data.message || 'Ocorreu um erro.');
          }
      } catch (error) {
          console.error('Erro na requisição:', error);
      }
  }
  

};