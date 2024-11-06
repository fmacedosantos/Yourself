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
      login(email, senha);
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
        
        await AsyncStorage.setItem('jwt', token); 
        const loginDate = new Date().toISOString();
        await AsyncStorage.setItem('loginDate', loginDate); 

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

export async function logout() {
  try {
    await AsyncStorage.removeItem('jwt'); 
    router.replace('/'); 
  } catch (error) {
    Alert.alert("Erro", "Não foi possível sair da conta.");
    console.error("Erro ao sair da conta: ", error);
  }
}

export async function checkToken(setLoading: (value: boolean) => void) {
  const token = await AsyncStorage.getItem('jwt');
  const loginDate = await AsyncStorage.getItem('loginDate');

  if (token && loginDate) {
    const now = new Date();
    const loginDateTime = new Date(loginDate);
    const diffDays = (Number(now) - Number(loginDateTime)) / (1000 * 60 * 60 * 24); 

    if (diffDays <= 3) {
      router.replace('/(tabs)/screens/home'); 
    } else {
      await logout(); 
    }
  }
  setLoading(false); 
}