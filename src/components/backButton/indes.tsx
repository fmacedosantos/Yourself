import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import BackIcon from '../../assets/images/back-icon.svg';
import { router } from 'expo-router';

function handleBack() {
    router.back();
}

export function BackButton() {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleBack()}>
      <BackIcon width={20} height={20} />
    </TouchableOpacity>
  );
}
