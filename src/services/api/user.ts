import { PATHS, ROUTES } from "@/src/constants/Routes";
import { fetchWithAuth } from "@/src/utils/fetchWithAuth";

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
  }
};