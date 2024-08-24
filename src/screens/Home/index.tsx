import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { RoundedButtonCreateTask } from '../../components/RoundedButtonCreateTask';
import { ViewSummaryStats } from '../../components/ViewSummaryStats';
import { ViewCreateTask } from '../../components/ViewCreateTask';

export function Home() {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleCloseCreateTask = () => {
    setIsCreatingTask(false);
  };
  return (
    <View style={styles.container}>
      <ViewSummaryStats/>
      <RoundedButtonCreateTask onPress={() => {
          setIsCreatingTask(true)
        }}/>

        {isCreatingTask && (<ViewCreateTask onClose={handleCloseCreateTask}/>)}
    </View>
  );
}