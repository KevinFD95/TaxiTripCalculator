import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "../context/ThemeContext.jsx";

import HomeNav from "./Home.jsx";
import CalculatorNav from "./Calculator.jsx";
import PricesNav from "./Prices.jsx";
import SettingsNav from "./Settings.jsx";

import HomeIcon from "../../assets/icons/HomeIcon.jsx";
import CalcIcon from "../../assets/icons/CalcIcon.jsx";
import PriceIcon from "../../assets/icons/PriceIcon.jsx";
import SettingsIcon from "../../assets/icons/SettingsIcon.jsx";
import { globalStyles } from "../styles/globalStyles.js";

const Tab = createBottomTabNavigator();
const iconSize = 42;

export default function TabNavigator() {
  const { theme } = useTheme();
  const themeStyles = globalStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme["tab-navigator"],
          height: 120,
          shadowColor: "transparent",
          borderBottomWidth: 0,
        },
        headerTitleAlign: "left",
        headerTitleStyle: themeStyles.h1,
        tabBarStyle: {
          backgroundColor: theme["tab-navigator"],
          height: 70,
          shadowColor: "transparent",
          paddingTop: Platform.OS === "ios" ? 0 : 15,
          borderTopWidth: 0,
        },
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNav}
        options={{
          title: "Inicio",
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
          title: "Configuración",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon size={iconSize} filled={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
