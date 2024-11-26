import { Alert, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { carregarResumoEstatisticas, reauthenticateUser } from '@/src/services/api/user';

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

export default function ConfirmPassword() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0
  });
  const [loading, setLoading] = useState(true); 
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function carregarDados() {
      carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false)
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }

  function handleNext() {
    reauthenticateUser(senha);
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
