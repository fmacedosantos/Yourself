import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import { ViewSummaryStats } from '../../components/ViewSummaryStats';
import { RoundedButtonCreateTask } from '../../components/RoundedButtonCreateTask';
import { ViewCreateTask } from '../../components/ViewCreateTask';
import { ButtonCreateTask } from '../../components/ButtonCreateTask';

export function Tasks() {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleCloseCreateTask = () => {
    setIsCreatingTask(false);
  };

  return (
    <View style={styles.container}>
        <ViewSummaryStats/>
        
        <ButtonCreateTask onPress={() => {
          setIsCreatingTask(true)
        }}/>

        {isCreatingTask && (<ViewCreateTask onClose={handleCloseCreateTask}/>)}
    </View>
  );
}