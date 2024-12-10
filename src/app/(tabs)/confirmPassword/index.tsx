import { Alert, View } from 'react-native';
import { styles } from './styles';
import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from '@/src/components/loadindScreen';
import { SummaryStats } from '@/src/components/summaryStats';
import { FormInput } from '@/src/components/formInput';
import { SolidButton } from '@/src/components/solidButton';
import { carregarResumoEstatisticas, reauthenticateUser } from '@/src/services/api/user';
import { router, useFocusEffect } from 'expo-router';
import { MessageAlert } from '@/src/components/messageAlert';
import { validateFields } from '@/src/utils/validators';
import { BackButton } from '@/src/components/backButton';
import { Title } from '@/src/components/title';
import { LoadFont } from '@/src/utils/loadFont';

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

  const carregarDados = useCallback(async () => {
      try {
        setLoading(true);
        const {success, message} = await carregarResumoEstatisticas(setResumoEstatisticas);
        if (!success) {
          setMessage(message);
          setVisible(true);
          return;
        }
    } catch {
        setMessage('Erro ao carregar informações.');
        setVisible(true);
    } finally {
        setLoading(false);
    }
    
  }, []);  

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  async function handleNext() {
    
    const fieldsValidate = validateFields({senha});

    if (!fieldsValidate.success) {
      setVisible(true);
      setMessage('Insira a senha para prosseguir!');
    } else {
      setLoading(true);
      const { success, message } = await reauthenticateUser(senha);

      if (success) {
        router.navigate('/(tabs)/settings');
      } else {
        setLoading(false);
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
