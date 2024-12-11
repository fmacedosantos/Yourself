import { useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { FormInput } from "../../components/formInput";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import { router } from "expo-router";
import { SolidButton } from '../../components/solidButton';
import { BorderButton } from '../../components/borderButton';
import { styles } from './styles';
import { validateEmail, validateFields } from '@/src/utils/validators';
import LoadingScreen from '@/src/components/loadindScreen';
import { checkToken, login } from '@/src/services/api/user';
import { MessageAlert } from '@/src/components/messageAlert';
import { useFonts } from '@expo-google-fonts/itim';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [fontsLoaded] = useFonts({
    'Itim-Regular': require('../../assets/fonts/Itim-Regular.ttf'),
  });

  LogBox.ignoreLogs([
    'fontFamily "Itim-Regular" is not a system font and has not been loaded through expo-font',
  ]);

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
      setLoading(true)
      const {success, message} = await login(email, senha);
      if (success) {
        router.replace('/(tabs)/screens/home');
      } else {
        setLoading(false);
        setSenha('');
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
        label="E-mail"
        placeholder="email@exemplo.com"
        value={email}
        onChangeText={setEmail}
        type='email'
      />
      <FormInput
        label="Senha"
        placeholder="@Senha1234"
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

    </View>
  );
}
