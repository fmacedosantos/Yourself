import { Link, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TextIcon } from "../components/textIcon";
import { COLORS } from "../constants/Colors";
import FormInput from "../components/formInput";
import { BigButton } from "../components/bigButton";

export default function Cadastro() {
  function handleEntrar(){
    router.replace('/(tabs)/screens/')
  }

  function handleLogin(){
    router.navigate('/')
  }

  return (
    <View
      style={[{
        backgroundColor: COLORS.GRAY
      }, styles.container]}
    >
      <TextIcon isAbsolute={false} margin={15}/>
      <FormInput label="Email" placeholder="seu@email.com"/>
      <FormInput label="Nome" placeholder="Nome completo"/>
      <FormInput label="Nome de usuário" placeholder="Nome de usuário"/>
      <FormInput label="Senha" placeholder="Senha"/>
      <FormInput label="Confirme a senha" placeholder="Confirme a senha"/>
      <BigButton title="Cadastrar" action={handleEntrar} type={1}/>

      <Text
          style={styles.login}
          onPress={handleLogin}
      >Login</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  login: {
      position: 'absolute',
      bottom: '5%',
      color: COLORS.ORANGE
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})