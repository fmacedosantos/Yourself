import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Tasks } from "../screens/Tasks";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from "../constants/colors";

const Tab = createBottomTabNavigator()

export function BottomTabRoutes(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="home" size={24} color={COLORS.BLACK} />
                    )
                }}
            />
            <Tab.Screen name="tasks" component={Tasks}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="tasks" size={24} color={COLORS.BLACK} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}