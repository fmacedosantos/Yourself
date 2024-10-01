import { Link, router } from "expo-router";
import { Text, View, Button, StyleSheet } from "react-native";
import { BigButton } from "../components/bigButton";
import { COLORS } from "../constants/Colors";
import FormInput from "../components/formInput";
import { TextIcon } from "../components/textIcon";

export default function Index() {

  function handleEntrar(){
    router.replace('/(tabs)/screens/')
  }

  function handleCadastrar(){
    router.navigate('/cadastro')
  }

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{
        backgroundColor: COLORS.GRAY
      }}
    >

      <TextIcon/>
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
})