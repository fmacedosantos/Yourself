import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';
import BackIcon from '../../assets/images/back.svg';
import { router } from 'expo-router';

interface BackButtonProps {
  style?: StyleProp<ViewStyle>;
}

function handleBack() {
  router.back();
}

export function BackButton({ style }: BackButtonProps) {
  return (
    <Pressable style={[styles.container, style]} onPress={handleBack}>
      <BackIcon width={20} height={20} />
    </Pressable>
  );
}
