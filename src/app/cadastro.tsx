import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Cadastro() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Cadastro</Text>
      <Link href='/'>Ir para login</Link>
    </View>
  );
}
