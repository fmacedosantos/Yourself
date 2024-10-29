import { Tabs } from "expo-router";
import HistoricalIcon from "../../../assets/icons/historical-icon.svg";
import AddActivityIcon from "../../../assets/icons/add_activity-icon.svg";
import ShopIcon from '../../../assets/icons/shop-icon.svg';
import ProfileIcon from '../../../assets/icons/profile-icon.svg';
import { COLORS } from "@/src/constants/Colors";

export default function TabsLayout() {
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
        name="home/index"
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
        name="activity/index"
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
        name="shop/index"
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
        name="profile/index"
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