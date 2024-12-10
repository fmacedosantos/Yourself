import {Itim_400Regular, useFonts} from '@expo-google-fonts/itim';

export function LoadFont(): boolean {
  const [fontsLoaded] = useFonts({
    'Itim-Regular': Itim_400Regular, 
  });

  return fontsLoaded;
}
