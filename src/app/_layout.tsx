import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { COLORS } from "../constants/Colors";

export default function RootLayout() {
  return (
    <>
      {/* Configuração da StatusBar fora do Stack */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.GRAY} />
      
      {/* Stack para gerenciar as rotas */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index/index" />
        <Stack.Screen name="register/index" />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false
          }} 
        />
      </Stack>
    </>
  );
}