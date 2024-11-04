import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from "../../constants/Colors";
import { FormInput } from "../../components/formInput";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import { router } from "expo-router";
import { SolidButton } from '../../components/solidButton';
import { BorderButton } from '../../components/borderButton';
import { styles } from './styles';
import { validateEmail, validateFields } from '@/src/utils/validators';
import { LoadFont } from '@/src/utils/loadFont';
import { forgotPassword, login, logout } from '@/src/services/api/auth';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  const fontsLoaded = LoadFont();

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('jwt');
      const loginDate = await AsyncStorage.getItem('loginDate');

      if (token && loginDate) {
        const now = new Date();
        const loginDateTime = new Date(loginDate);
        const diffDays = (Number(now) - Number(loginDateTime)) / (1000 * 60 * 60 * 24); 

        if (diffDays <= 3) {
          router.replace('/(tabs)/screens/home'); // Redireciona se o token estiver válido
        } else {
          await logout(); // Expira a sessão e remove o token
        }
      }
      setLoading(false); // Finaliza o carregamento
    }

    checkToken();
  }, []);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color={COLORS.ORANGE} />;
  }

  function handleEnter() {
    if (validateFields({email, senha}) && validateEmail(email)) {
      login(email, senha);
    }
  }

  function handleForgotPassword() {
    if (validateFields({email}) && validateEmail(email)) {
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
