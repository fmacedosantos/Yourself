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
import { MessageAlert } from '@/src/components/messageAlert';
import { EmailInputAlert } from '@/src/components/inputMessageAlert';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  // Alerta
  const [visible, setVisible] = useState(false);
  const [visibleForgotPassword, setVisibleForgotPassword] = useState(false);
  const [message, setMessage] = useState('');

  const fontsLoaded = LoadFont();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const {success} = await checkToken();
        
        if (success) {
          router.replace('/(tabs)/screens/home');
        } else {
          setLoading(false);
        }
      } catch (error) {
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

  async function handleForgotPassword(email: string) {
    const fieldsValidate = validateFields({ email });
    const emailValidate = validateEmail(email);
  
    if (!fieldsValidate.success) {
      setVisibleForgotPassword(false);
      setVisible(true);
      setMessage(fieldsValidate.message);
    } else if (!emailValidate.success) {
      setVisibleForgotPassword(false);
      setVisible(true);
      setMessage(emailValidate.message);
    } else {
      const { success, message } = await forgotPassword(email);
      setMessage(message);
      setVisibleForgotPassword(false);
      setVisible(true);
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
        type='email'
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
        onPress={() => {
          setEmail('');
          setVisibleForgotPassword(true);
        }}
      >
        Esqueceu a senha?
      </Text>
      <EmailInputAlert 
        onCancel={() => setVisibleForgotPassword(false)}
        title='Insira seu email para redefinição:'
        visible={visibleForgotPassword}
        onSend={(email) => handleForgotPassword(email)} 
      />

    </View>
  );
}
