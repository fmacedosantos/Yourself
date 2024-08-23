import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import icon from '../../../assets/pictures/icon.png'
import { ViewSummaryStats } from '../../components/ViewSummaryStats';
import { ButtonTask } from '../../components/ButtonTask';
import { ViewCreateTask } from '../../components/ViewCreateTask';

export function Tasks() {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleCloseCreateTask = () => {
    setIsCreatingTask(false);
  };

  return (
    <View style={styles.container}>
        <ViewSummaryStats/>
        <Text style={styles.textTitle}>CONCENTRAÇÃO</Text>
        <Text style={styles.textTimer}>00:00</Text>
        <Image source={icon} style={styles.icon}/>
        <ButtonTask onPress={() => {
          setIsCreatingTask(true);
        }}/>

        {isCreatingTask && (<ViewCreateTask onClose={handleCloseCreateTask}/>)}
    </View>
  );
}