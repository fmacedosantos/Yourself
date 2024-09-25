import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
          headerShown: false, 
          tabBarIcon: ({focused, color, size}) => {

            if(focused){
              return <FontAwesome name="home" color="red" size={size}/>
            }
            return <FontAwesome name="home" color={color} size={size}/>
          }
          }}/>
    </Tabs>
  );
}