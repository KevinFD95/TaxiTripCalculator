import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { ThemeContext } from "../context/ThemeContext.jsx";
import { globalStyles } from "../styles/globalStyles.js";

// import CustomSwitch from "../components/SwitchComponent.jsx";

import LightModeIcon from "../../assets/icons/LightModeIcon.jsx";
import DarkModeIcon from "../../assets/icons/DarkModeIcon.jsx";

export default function SettingsNav() {
  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const themeStyles = globalStyles(theme);
  const lightmode = mode === "light";
  const darkmode = mode === "dark";

  return (
    <View style={themeStyles.mainContainer}>
      <View style={styles.settingContainer}>
        <Text>Tema</Text>
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              if (!lightmode) toggleTheme("light");
            }}
          >
            <LightModeIcon size={42} focused={lightmode} />
          </Pressable>
          <Pressable
            onPress={() => {
              if (!darkmode) toggleTheme("dark");
            }}
          >
            <DarkModeIcon size={42} focused={darkmode} />
          </Pressable>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text>Tamanyo de letra</Text>
        <Text>Colocar desplegable</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
