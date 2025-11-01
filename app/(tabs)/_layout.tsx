import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import "../../global.css";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size ?? 24} color={color ?? "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: false,
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              size={size ?? 24}
              color={color ?? "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          headerShown: false,
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="bar-chart-2"
              size={size ?? 24}
              color={color ?? "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          href: null,
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="bar-chart-2"
              size={size ?? 24}
              color={color ?? "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
