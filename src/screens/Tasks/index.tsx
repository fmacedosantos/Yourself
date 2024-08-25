import { View } from 'react-native';

import { styles } from './styles';

import { SummaryStats } from '../../components/views/SummaryStats';
import { RectangularBrowser } from '../../components/buttons/RectangularBrowser';

export function Tasks({navigation}: any) {

  return (
    <View style={styles.container}>
        <SummaryStats/>
        
        <RectangularBrowser text='INICIAR TAREFA' onPress={() => {
          navigation.navigate('CreateTask')
        }}/>

    </View>
  );
}