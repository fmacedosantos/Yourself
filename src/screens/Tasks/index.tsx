import { View } from 'react-native';

import { styles } from './styles';

import { ViewSummaryStats } from '../../components/ViewSummaryStats';
import { ButtonCreateTask } from '../../components/ButtonCreateTask';

export function Tasks({navigation}: any) {

  return (
    <View style={styles.container}>
        <ViewSummaryStats/>
        
        <ButtonCreateTask text='INICIAR TAREFA' onPress={() => {
          navigation.navigate('CreateTask')
        }}/>

    </View>
  );
}