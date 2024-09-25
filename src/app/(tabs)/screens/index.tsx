import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>Home</Text>
      <Link href="/">Voltar</Link>
    </View>
  );
}
