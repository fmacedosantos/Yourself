import { useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font'; // Importando useFonts
import { BigButton } from "../components/bigButton";
import { COLORS } from "../constants/Colors";
import { FormInput } from "../components/formInput";
import YourselfTitle from '../assets/images/yourself-title.svg';
import firebase from '../../firebase-init.js';
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Carregar fonte personalizada
  const [fontsLoaded] = useFonts({
    'Itim-Regular': require('../../assets/fonts/Itim-Regular.ttf'), // Caminho para sua fonte
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
      .then(() => {
        router.replace('/(tabs)/screens/');
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

  function handleCadastrar() {
    router.navigate('/cadastro');
  }

  return (
    <View style={[{ backgroundColor: COLORS.GRAY }, styles.container]}>
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

      <BigButton title="Entrar" action={handleEntrar} type={1} />
      <BigButton title="Cadastrar" action={handleCadastrar} type={2} />

      <Text style={styles.forget}>Esqueceu a senha?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forget: {
    position: 'absolute',
    bottom: '5%',
    fontSize: 16,
    color: COLORS.ORANGE,
    fontFamily: 'Itim-Regular' 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Itim-Regular' 
  }
});
