import { useEffect, useState } from 'react';
import { LogBox, Text, View } from 'react-native';
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
import { MessageAlert } from '@/src/components/messageAlert';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  // Alerta
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

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

  LogBox.ignoreLogs([
    'await in (anonymous)',
    'performFetchWithErrorHandling',
    'signInWithPassword',
    'VirtualizedList',
  ]);

  async function handleEnter() {
    const fieldsValidate = validateFields({email, senha});
    const emailValidate = validateEmail(email);

    if (!fieldsValidate.success) {
      setVisible(true);
      setMessage(fieldsValidate.message);
    } else if (!emailValidate.success) {
      setVisible(true);
      setMessage(emailValidate.message);
    } else {
      const {success, message} = await login(email, senha);
      if (success) {
        router.replace('/(tabs)/screens/home');
      } else {
        setMessage(message);
        setVisible(true);
      }
    }
  }

  async function handleForgotPassword() {
    const fieldsValidate = validateFields({email});
    const emailValidate = validateEmail(email);

    if (!fieldsValidate.success) {
      setVisible(true);
      setMessage(fieldsValidate.message);
    } else if (!emailValidate.success) {
      setVisible(true);
      setMessage(emailValidate.message);
    } else {
      const {success, message} = await forgotPassword(email);
      if (success) {
        setMessage(message);
        setVisible(true);
      } else {
        setMessage(message);
        setVisible(true);
      }
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
      <MessageAlert
        type={1}
        message={message}
        visible={visible}
        onCancel={() => setVisible(false)}
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
