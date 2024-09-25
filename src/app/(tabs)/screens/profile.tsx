import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text>Profile</Text>
      <Link href="/">Sair da conta</Link>
    </View>
  );
}
