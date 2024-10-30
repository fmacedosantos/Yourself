import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebase-init.js';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { PATHS, ROUTES } from '../../constants/Routes.ts';

export async function register(email: string, nome: string, apelido: string, senha: string){
  try {
    const response = await fetch(ROUTES(PATHS.REGISTER_USER), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nome,
        apelido,
        senha
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.replace('/(tabs)/screens/home');
    } else {
      Alert.alert('Erro', data.message || 'Ocorreu um erro no cadastro.');
    }

  } catch (error) {
    Alert.alert('Erro', 'Falha ao conectar com o servidor.');
  }
}

export function login(email: string, senha: string){
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (userCredential) => {
        if (userCredential.user) {
          const token = await userCredential.user.getIdToken(); 

          console.log(token);
          console.log("opa")

          await AsyncStorage.setItem('jwt', token); 
          
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

export function forgotPassword(email: string){
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