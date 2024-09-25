import { Tabs } from "expo-router";
import {FontAwesome} from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
          headerShown: false, 
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {

            if(focused){
              return <FontAwesome name="home" size={size} color={color}/>
            }
            return <FontAwesome name="home" size={size} color={color}/>
          }
          }}/>
    </Tabs>
  );
}