import { router } from "expo-router";
import { Text, View, Button, StyleSheet } from "react-native";
import { BigButton } from "../components/bigButton";
import { COLORS } from "../constants/Colors";
import FormInput from "../components/formInput";
import { TextIcon } from "../components/textIcon";

import firebase from '../../firebase-init.js'; // Importa o firebase compat

export default function Index() {

  function handleEntrar(){
    firebase.auth().signInWithEmailAndPassword("teste001@gmail.com", "123456")
      .then(response => {
        router.replace('/(tabs)/screens/')
      })
      .catch(error => {
        console.error("Erro de login: ", error);
      });
  }

  function handleCadastrar(){
    router.navigate('/cadastro')
  }

  return (
    <View
      style={[{
        backgroundColor: COLORS.GRAY
      }, styles.container]}
    >
      <TextIcon isAbsolute={true} top={50}/>
      <FormInput label="Email" placeholder="seu@email.com" />
      <FormInput label="Senha" placeholder="senha" isPassword={true}/>
      <BigButton title="Entrar" action={handleEntrar} type={1}/>
      <BigButton title="Cadastrar" action={handleCadastrar} type={2}/>

      <Text
          style={styles.forget}
      >Esqueceu a senha?</Text>
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
