import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabRoutes } from "./bottom-tabs.routes";
import { CreateTask } from "../components/CreateTask";
import { Pomodoro } from "../components/Pomodoro";
import { Home } from "../screens/Home/HomeScreen";
import Login from "../screens/Login/Login";

const Stack = createStackNavigator();

export function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>   
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home"   component={HomeScreen} />       
          <Stack.Screen name="BottomTabRoutes" component={BottomTabRoutes} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="Pomodoro" component={Pomodoro} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } 