// app/_layout.tsx ou RootLayout.tsx (depende da estrutura que você escolheu)
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro" options={{ headerShown: false }} />
      <Stack.Screen name="historico" options={{ headerShown: false }} />  {/* Adiciona a tela de histórico */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
