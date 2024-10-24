import { useState } from "react";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { BigButton } from "../components/bigButton";
import { COLORS } from "../constants/Colors";
import { FormInput } from "../components/formInput";
import { TextIcon } from "../components/textIcon";

import firebase from '../../firebase-init.js'; // Importa o firebase compat

export default function Index() {
  // Estado para armazenar o email e a senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o login
  function handleEntrar() {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(response => {
        router.replace('/(tabs)/screens/');
      })
      .catch(error => {
        console.error("Erro de login: ", error);
      });
  }

  function handleCadastrar() {
    router.navigate('/cadastro');
  }

  return (
    <View
      style={[{ backgroundColor: COLORS.GRAY }, styles.container]}
    >
      <TextIcon isAbsolute={true} top={50} />
      {/* Passamos o valor e a função para atualizar o estado */}
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

      <Text style={styles.forget}>
        Esqueceu a senha?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forget: {
    position: 'absolute',
    bottom: '5%',
    color: COLORS.ORANGE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
