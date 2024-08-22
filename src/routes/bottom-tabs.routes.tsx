import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Tasks } from "../screens/Tasks";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from "../constants/colors";

const {Navigator, Screen} = createBottomTabNavigator()

export function BottomTabRoutes(){
    return(
        <Navigator>
            <Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="home" size={24} color={COLORS.BLACK} />
                    )
                }}
            />
            <Screen name="Tasks" component={Tasks}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="tasks" size={24} color={COLORS.BLACK} />
                    )
                }}
            />
        </Navigator>
    )
}