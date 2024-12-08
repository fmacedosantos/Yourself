import { View, ActivityIndicator, Text } from 'react-native';
import { COLORS } from "../../constants/Colors";
import { styles } from './styles';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.loaderBackground}>
        <Text style={styles.textLoad}>Carregando...</Text>
        <ActivityIndicator size="large" color={COLORS.ORANGE} />
      </View>
    </View>
  );
}


