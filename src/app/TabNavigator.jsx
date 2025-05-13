import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ThemeContext } from "../context/ThemeContext.jsx";

import HomeNav from "./Home.jsx";
import CalculatorNav from "./Calculator.jsx";
import PricesNav from "./Prices.jsx";
import SettingsNav from "./Settings.jsx";

import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import CalcIcon from "../../assets/icons/CalcIcon.jsx";
import PriceIcon from "../../assets/icons/PriceIcon.jsx";
import SettingsIcon from "../../assets/icons/SettingsIcon.jsx";

const Tab = createBottomTabNavigator();
const iconSize = 32;

export default function TabNavigator() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme["tab-navigator"] },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: theme["tab-navigator"],
          paddingTop: 5,
        },
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNav}
        options={{
          title: "Principal",
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="calculator"
        component={CalculatorNav}
        options={{
          title: "Calculadora",
          tabBarIcon: ({ focused }) => (
            <CalcIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="prices"
        component={PricesNav}
        options={{
          title: "Precios",
          tabBarIcon: ({ focused }) => (
            <PriceIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsNav}
        options={{
          title: "Configuracion",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon size={iconSize} filled={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
