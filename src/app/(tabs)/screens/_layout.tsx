import { Tabs } from "expo-router";
import HistoricalIcon from "../../../assets/icons/historical-icon.svg"; // Importe o SVG como componente

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
    </Tabs>
  );
}
