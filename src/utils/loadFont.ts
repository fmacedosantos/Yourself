import { useFonts } from "expo-font";

export function LoadFont(): boolean {
  const [fontsLoaded] = useFonts({
    'Itim-Regular': require('../../assets/fonts/Itim-Regular.ttf'), 
  });

  return fontsLoaded;
}
