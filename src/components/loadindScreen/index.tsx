import { View, ActivityIndicator } from 'react-native';
import { COLORS } from "../../constants/Colors";
import { styles } from './styles';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.loaderBackground}>
        <ActivityIndicator size="large" color={COLORS.ORANGE} />
      </View>
    </View>
  );
}


