import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabRoutes } from "./bottom-tabs.routes";
import { CreateTask } from "../screens/CreateTask";

const Stack = createStackNavigator();

export function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BottomTabRoutes" component={BottomTabRoutes} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }