import { Stack } from "expo-router";
import '../styles/global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false
      }}/>
      <Stack.Screen name="cadastro" options={{
        headerShown: false
      }}/>
      <Stack.Screen name="(tabs)/screens" options={{
        headerShown: false
      }}/>
    </Stack>
  );
}
