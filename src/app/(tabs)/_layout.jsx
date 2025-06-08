import { Platform } from "react-native";
import { Tabs } from "expo-router";

import { useTheme } from "../../context/ThemeContext.jsx";

import { globalStyles } from "../../styles/globalStyles.js";
import HomeIcon from "../../../assets/icons/HomeIcon.jsx";
import CalcIcon from "../../../assets/icons/CalcIcon.jsx";
import PriceIcon from "../../../assets/icons/PriceIcon.jsx";
import SettingsIcon from "../../../assets/icons/SettingsIcon.jsx";

const iconSize = 42;

export default function Layout() {
  const { theme } = useTheme();
  const themeStyles = globalStyles(theme);

  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculadora",
          tabBarIcon: ({ focused }) => (
            <CalcIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="prices"
        options={{
          title: "Precios",
          tabBarIcon: ({ focused }) => (
            <PriceIcon size={iconSize} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon size={iconSize} filled={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
