import { View } from 'react-native';

import { styles } from './NewActivity.styles';

import { SummaryStats } from '../../components/SummaryStats';
import { RectangularBrowser } from '../../components/RectangularBrowser';

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