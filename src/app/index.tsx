import { router } from "expo-router";
import { Text, View, StyleSheet, Alert } from "react-native";
import { BigButton } from "../components/bigButton";
import { COLORS } from "../constants/Colors";
import { FormInput }  from "../components/formInput";
import { TextIcon } from "../components/textIcon";
import { useState } from 'react';
import firebase from '../../firebase-init.js'; // Importa o firebase compat

export default function Index() {
  // Adiciona estados para capturar email e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleEntrar(){
    // Validações básicas
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação simples de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "O formato do email está incorreto.");
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(response => {
        router.replace('/(tabs)/screens/');
      })
      .catch(error => {
        // Captura erros específicos do Firebase e exibe uma mensagem
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert("Erro", "Informações incorretas.");
            break;
          case 'auth/wrong-password':
            Alert.alert("Erro", "Informações incorretas.");
            break;
          case 'auth/invalid-email':
            Alert.alert("Erro", "O email fornecido é inválido.");
            break;
          case 'auth/invalid-credential':
            Alert.alert("Erro", "Informações incorretas.");
            break;
          default:
            Alert.alert("Erro", "Ocorreu um erro ao fazer login. Tente novamente.");
            console.error("Erro de login: ", error);
        }
      });
  }

  function handleCadastrar(){
    router.navigate('/cadastro');
  }

  return (
    <View
      style={[{
        backgroundColor: COLORS.GRAY
      }, styles.container]}
    >
      <TextIcon isAbsolute={true} top={50}/>

      {/* Atribui os valores digitados pelo usuário */}
      <FormInput 
        label="Email" 
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}  // Atualiza o estado do email
      />
      <FormInput 
        label="Senha" 
        placeholder="senha" 
        isPassword={true}
        value={senha}
        onChangeText={setSenha}  // Atualiza o estado da senha
      />

      <BigButton title="Entrar" action={handleEntrar} type={1}/>
      <BigButton title="Cadastrar" action={handleCadastrar} type={2}/>

      <Text style={styles.forget}>Esqueceu a senha?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forget: {
    position: 'absolute',
    bottom: '5%',
    color: COLORS.ORANGE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
