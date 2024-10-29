import { useState } from 'react';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font'; 
import { COLORS } from "../../constants/Colors";
import { FormInput } from "../../components/formInput";
import YourselfTitle from '../../assets/images/yourself-title.svg';
import firebase from '../../../firebase-init.js';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnterButton } from '../../components/enterButton';
import { RegisterButton } from '../../components/registerButton';
import { styles } from './styles';

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Carregar fonte personalizada
  const [fontsLoaded] = useFonts({
    'Itim-Regular': require('../../../assets/fonts/Itim-Regular.ttf'), // Caminho para sua fonte
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={COLORS.ORANGE} />;
  }

  function handleEntrar() {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "O formato do email está incorreto.");
      return;
    }
  
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (userCredential) => {
        if (userCredential.user) {
          const token = await userCredential.user.getIdToken(); // Obtenha o JWT do Firebase

          console.log(token);
          console.log("opa")

          await AsyncStorage.setItem('jwt', token); // Armazene o token no dispositivo
          
          router.replace('/(tabs)/screens/home');
        }
        
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-email':
          case 'auth/invalid-credential':
            Alert.alert("Erro", "Informações incorretas.");
            break;
          default:
            Alert.alert("Erro", "Ocorreu um erro ao fazer login. Tente novamente.");
            console.error("Erro de login: ", error);
        }
      });
  }

  // Função para redefinir a senha
  function handleEsquecerSenha() {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu email para redefinir a senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "O formato do email está incorreto.");
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Sucesso", "Um e-mail de redefinição de senha foi enviado.");
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert("Erro", "Usuário não encontrado com este email.");
        } else {
          Alert.alert("Erro", "Ocorreu um erro ao enviar o e-mail de redefinição de senha.");
          console.error("Erro ao redefinir senha: ", error);
        }
      });
  }

  function handleCadastrar() {
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

      <EnterButton title='Entrar' action={handleEntrar}/>
      <RegisterButton title='Cadastrar' action={handleCadastrar}/>

      <Text
        style={styles.forget}
        onPress={handleEsquecerSenha} 
      >
        Esqueceu a senha?
      </Text>
    </View>
  );
}


