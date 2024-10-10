import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View
      style={styles.container}
    >
      <Text>Profile</Text>
      <Link href='/(tabs)/settings'>Configurações</Link>
      <Link href="/">Sair da conta</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
