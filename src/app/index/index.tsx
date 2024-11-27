import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FormInput } from "../../components/formInput";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import { router } from "expo-router";
import { SolidButton } from '../../components/solidButton';
import { BorderButton } from '../../components/borderButton';
import { styles } from './styles';
import { validateEmail, validateFields } from '@/src/utils/validators';
import { LoadFont } from '@/src/utils/loadFont';
import LoadingScreen from '@/src/components/loadindScreen';
import { checkToken, forgotPassword, login } from '@/src/services/api/user';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  const fontsLoaded = LoadFont();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await checkToken();
        
        if (token.success) {
          router.replace('/(tabs)/screens/home');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro na inicialização:', error);
        setLoading(false);
      }
    };
  
    if (fontsLoaded) {
      initializeApp();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  function handleEnter() {
    if (validateFields({ email, senha }) && validateEmail(email)) {
      login(email, senha);
    }
  }

  function handleForgotPassword() {
    if (validateFields({ email }) && validateEmail(email)) {
      forgotPassword(email);
    }
  }

  function handleGoToRegister() {
    router.navigate('/register');
  }

  return (
    <View style={styles.container}>
      <YourselfTitle width={200} height={100} />

      <FormInput
        label="Email"
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        label="Senha"
        placeholder="senha"
        isPassword={true}
        value={senha}
        onChangeText={setSenha}
      />

      <SolidButton title='Entrar' action={handleEnter} />
      <BorderButton title='Cadastrar' color={1} action={handleGoToRegister} />

      <Text
        style={styles.forget}
        onPress={handleForgotPassword}
      >
        Esqueceu a senha?
      </Text>
    </View>
  );
}
