import { View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { userService } from '@/src/services/api/user';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function Settings() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function carregarDados() {
      userService.carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false)
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }

  function handleNext(){

  }
 return (
  <View
  style={styles.container}
  >
    <SummaryStats 
      ofensiva={resumoEstatisticas.ofensiva} 
      pontos={resumoEstatisticas.pontos}
    />

    <FormInput value={senha} onChangeText={setSenha} placeholder='confirme sua identidade' label='Senha' isPassword={true}/>
    <SolidButton title='Avançar' action={handleNext}/>
</View>
  );
}
