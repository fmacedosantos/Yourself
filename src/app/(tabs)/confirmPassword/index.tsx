import { Alert, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { carregarResumoEstatisticas, reauthenticateUser } from '@/src/services/api/user';
import { router } from 'expo-router';
import { MessageAlert } from '@/src/components/messageAlert';
import { validateFields } from '@/src/utils/validators';
import { BackButton } from '@/src/components/backButton/indes';
import { Title } from '@/src/components/title';

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

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function carregarDados() {
      await carregarResumoEstatisticas(setResumoEstatisticas);
      setLoading(false);
    }
    carregarDados();
  }, []);  

  if (loading) {
    return <LoadingScreen />; 
  }

  async function handleNext() {
    
    const fieldsValidate = validateFields({senha});

    if (!fieldsValidate.success) {
      setVisible(true);
      setMessage('Insira a senha para prosseguir!');
    } else {
      const { success, message } = await reauthenticateUser(senha);

      if (success) {
        router.navigate('/(tabs)/settings');
      } else {
        setVisible(true);
        setMessage(message);
      }
    }
  }

 return (
  <View
  style={styles.container}
  >
    <SummaryStats 
      ofensiva={resumoEstatisticas.ofensiva} 
      pontos={resumoEstatisticas.pontos}
    />
    <Title title="Confirme sua senha" containerStyle={{ position: 'absolute', top: 0 }} />
    <BackButton/>
    <MessageAlert
        type={1}
        message={message}
        visible={visible}
        onCancel={() => setVisible(false)}
      />

    <FormInput value={senha} onChangeText={setSenha} placeholder='confirme sua identidade' label='Senha' isPassword={true}/>
    <SolidButton title='Avançar' action={handleNext}/>
</View>
  );
}
