import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Tasks } from "../screens/Tasks";

const {Navigator, Screen} = createBottomTabNavigator()

export function BottomTabRoutes(){
    return(
        <Navigator>
            <Screen name="Home" component={Home}/>
            <Screen name="Tasks" component={Tasks}/>
        </Navigator>
    )
}