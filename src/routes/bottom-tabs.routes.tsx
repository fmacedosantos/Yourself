import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home/HomeScreen";
import { Tasks } from "../screens/NewActivity/NewActivityScreen";

import historicalIcon from '../../assets/icons/historical-icon.svg';
import addActivityIcon from '../../assets/icons/add_activity-icon.svg';
import shopIcon from '../../assets/icons/shop-icon.svg';
import profileIcon from '../../assets/icons/profile-icon.svg';
import { Shop } from "../screens/Shop/ShopScreen";
import { Profile } from "../screens/Profile/ProfileScreen";
import { Image } from "react-native";
import Login from "../screens/Login/Login";

const Tab = createBottomTabNavigator()

export function BottomTabRoutes(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false, 
            tabBarShowLabel: false
            }}>
            <Tab.Screen name="login" component={Login}
            />
            <Tab.Screen name="home" component={Home}
                options={{
                    tabBarIcon: () => (
                        <Image source={historicalIcon}/>
                    )
                }}
            />
            <Tab.Screen name="tasks" component={Tasks}
                options={{
                    tabBarIcon: () => (
                        <Image source={addActivityIcon}/>
                    )
                }}
            />
            <Tab.Screen name="shop" component={Shop}
                options={{
                    tabBarIcon: () => (
                        <Image source={shopIcon}/>
                    )
                }}
            />
            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarIcon: () => (
                        <Image source={profileIcon}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}