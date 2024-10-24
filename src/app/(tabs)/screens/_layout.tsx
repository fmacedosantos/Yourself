import { Tabs } from "expo-router";
import HistoricalIcon from "../../../assets/icons/historical-icon.svg";
import AddActivityIcon from "../../../assets/icons/add_activity-icon.svg";
import ShopIcon from '../../../assets/icons/shop-icon.svg';
import ProfileIcon from '../../../assets/icons/profile-icon.svg';
import { COLORS } from "@/src/constants/Colors";

export default function Layout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60, 
          backgroundColor: COLORS.WHITE
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
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
        name="activity"
        options={{
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
