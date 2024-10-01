import { Link, router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {

  function handleEntrar(){
    router.replace('/(tabs)/screens/')
  }

  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>Login</Text>
      <Button title="Entrar" onPress={handleEntrar}/>
      <Link href='/cadastro'>Ir para cadastro</Link>
    </View>
  );
}
