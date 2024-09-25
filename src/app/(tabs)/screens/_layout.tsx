import { Tabs } from "expo-router";
import HistoricalIcon from "../../../assets/icons/historical-icon.svg";
import AddActivityIcon from "../../../assets/icons/add_activity-icon.svg";
import ShopIcon from '../../../assets/icons/shop-icon.svg';
import ProfileIcon from '../../../assets/icons/profile-icon.svg';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <HistoricalIcon
              width={35}
              height={35}
              fill={'white'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addNewActivity"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AddActivityIcon
              width={35}
              height={35}
              fill={'white'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <ShopIcon
              width={35}
              height={35}
              fill={'white'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <ProfileIcon
              width={35}
              height={35}
              fill={'white'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
