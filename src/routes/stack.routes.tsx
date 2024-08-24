import { createStackNavigator } from "@react-navigation/stack";
import { ViewCreateTask } from "../components/ViewCreateTask";

const {Navigator, Screen} = createStackNavigator()

export function StackRoutes(){
    return(
        <Navigator>
            <Screen name="ViewCreateTask" component={ViewCreateTask}/>
        </Navigator>
    )
}