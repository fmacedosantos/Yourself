import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../firebase-init.js';
import { router } from 'expo-router';
import { Alert, Platform } from 'react-native';
import { PATHS, ROUTES } from '../../constants/Routes.ts';

const erroServidor = 'Encontramos problemas ao conectar com o servidor.';

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
      if (Platform.OS === 'web') {
        window.alert(data.message || 'Ocorreu um erro no cadastro.');
        return;
      } else {
        Alert.alert('Erro', data.message || 'Ocorreu um erro no cadastro.');
        return;
      }
    }

  } catch (error) {
    if (Platform.OS === 'web') {
      window.alert(erroServidor);
    } else {
      Alert.alert('Erro', erroServidor)
    }
  }
}

export function login(email: string, senha: string){
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(async (userCredential) => {
      if (userCredential.user) {
        const token = await userCredential.user.getIdToken(); 
        
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
          if (Platform.OS === 'web') {
            window.alert("Informações incorretas.");
          } else {
            Alert.alert("Erro", "Informações incorretas.");
          }
          break;
        default:
          if (Platform.OS === 'web') {
            window.alert("Ocorreu um erro ao fazer login. Tente novamente.");
          } else {
            Alert.alert("Erro", "Ocorreu um erro ao fazer login. Tente novamente.");
          }
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
          if (Platform.OS === 'web') {
            window.alert("Email inválido.");
          } else {
            Alert.alert("Erro", "Email inválido.");
          }
        } else {
          if (Platform.OS === 'web') {
            window.alert("Ocorreu um erro ao enviar o e-mail de redefinição de senha.");
          } else {
            Alert.alert("Erro", "Ocorreu um erro ao enviar o e-mail de redefinição de senha.");
          }
        }
      });
}

export async function logout() {
  try {
    await AsyncStorage.removeItem('jwt'); 
    router.replace('/'); 
  } catch (error) {
    if (Platform.OS === 'web') {
      window.alert('Não foi possível sair da conta.');
    } else {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }

  }
}

export async function reauthenticateUser(senha: string) {
  const user = firebase.auth().currentUser;
  if (user) {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email as string, senha);
    try {
      await user.reauthenticateWithCredential(credential);
      router.navigate('/(tabs)/settings')
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert("Senha incorreta. Tente novamente.");
      } else {
        Alert.alert("Erro", "Senha incorreta. Tente novamente.");
      }
    }
  } else {
    if (Platform.OS === 'web') {
      window.alert("Usuário não encontrado.");
    } else {
      Alert.alert("Erro", "Usuário não encontrado.");
    }
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