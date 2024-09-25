import { Link, router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {

  function handleEntrar(){
    router.replace('home')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login</Text>
      <Button title="Entrar" onPress={handleEntrar}/>
      <Link href='/cadastro'>Ir para cadastro</Link>
    </View>
  );
}
