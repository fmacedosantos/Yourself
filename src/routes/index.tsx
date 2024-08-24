import { NavigationContainer } from "@react-navigation/native";
import { BottomTabRoutes } from "./bottom-tabs.routes";
import { StackRoutes } from "./stack.routes";

export function Routes(){
    return(
        <NavigationContainer>
            <BottomTabRoutes/>
            <StackRoutes/>
        </NavigationContainer>
        
    )
}