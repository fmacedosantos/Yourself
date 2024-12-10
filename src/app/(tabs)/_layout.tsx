import { COLORS } from "@/src/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return <>
  <StatusBar barStyle="light-content" backgroundColor={COLORS.GRAY} />
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens" />
        <Stack.Screen name="confirmPassword/index"/>
        <Stack.Screen name="settings/index"/>
        <Stack.Screen name="pomodoro/index"/>
        <Stack.Screen name="editTimer/index"/>
        <Stack.Screen name="userTutorial/index"/>
    </Stack>
  </>
}
