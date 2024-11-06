import { useFonts } from "expo-font";
import Itim from '../../assets/fonts/Itim-Regular.ttf';

export function LoadFont(): boolean {
  const [fontsLoaded] = useFonts({
    'Itim-Regular': Itim, 
  });

  return fontsLoaded;
}
