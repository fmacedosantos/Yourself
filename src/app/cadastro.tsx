import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Cadastro() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>Cadastro</Text>
      <Link href='/'>Ir para login</Link>
    </View>
  );
}
