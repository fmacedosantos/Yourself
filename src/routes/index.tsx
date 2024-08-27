import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabRoutes } from "./bottom-tabs.routes";
import { CreateTask } from "../components/views/CreateTask";
import { Pomodoro } from "../components/views/Pomodoro";

const Stack = createStackNavigator();

export function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BottomTabRoutes" component={BottomTabRoutes} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="Pomodoro" component={Pomodoro} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }