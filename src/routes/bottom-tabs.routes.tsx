import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Tasks } from "../screens/Tasks";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from "../constants/colors";
import { Shop } from "../screens/Shop";
import { Profile } from "../screens/Profile";

const Tab = createBottomTabNavigator()

export function BottomTabRoutes(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="home" size={27} color={COLORS.BLACK} />
                    )
                }}
            />
            <Tab.Screen name="tasks" component={Tasks}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="tasks" size={27} color={COLORS.BLACK} />
                    )
                }}
            />
            <Tab.Screen name="shop" component={Shop}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="shopping-cart" size={27} color="black" />
                    )
                }}
            />
            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="male" size={27} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}