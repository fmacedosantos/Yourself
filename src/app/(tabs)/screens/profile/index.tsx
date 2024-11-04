import { Text, View } from "react-native";
import { styles } from "./styles";
import { logout } from '@/src/services/api/auth';
import { Link } from "expo-router";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Link href='/(tabs)/settings'>Configurações</Link>
      <Text onPress={logout}>Sair da conta</Text> 
    </View>
  );
}
