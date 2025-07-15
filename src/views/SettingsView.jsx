import { View, Text, Pressable, StyleSheet } from "react-native";

import Constants from "expo-constants";

import { useTheme } from "../context/ThemeContext.jsx";
import { globalStyles } from "../styles/globalStyles.js";
import { responsiveIconSize, responsiveGap } from "../utils/responsive.js";

import LightModeIcon from "../../assets/icons/LightModeIcon.jsx";
import DarkModeIcon from "../../assets/icons/DarkModeIcon.jsx";
import { CustomButton } from "../components/CustomButtonComponent.jsx";
import { useRouter } from "expo-router";

export default function SettingsView() {
  const router = useRouter();
  const { theme, mode, toggleTheme } = useTheme();

  const themeStyles = globalStyles(theme);
  const iconSize = responsiveIconSize(42);

  const lightmode = mode === "light";
  const darkmode = mode === "dark";

  const version = Constants.expoConfig?.version ?? "Nula";

  return (
    <View
      style={[themeStyles.mainContainer, { justifyContent: "space-between" }]}
    >
      <View style={styles.settingContainer}>
        <Text style={themeStyles.h3}>Tema</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            gap: responsiveGap(10),
          }}
        >
          <Pressable
            onPress={() => {
              if (!lightmode) toggleTheme("light");
            }}
          >
            <LightModeIcon size={iconSize} focused={lightmode} />
          </Pressable>
          <Pressable
            onPress={() => {
              if (!darkmode) toggleTheme("dark");
            }}
          >
            <DarkModeIcon size={iconSize} focused={darkmode} />
          </Pressable>
        </View>
      </View>

      {/* <View style={styles.settingContainer}>
        <Text style={themeStyles.h3}>Tamaño de letra</Text>
        <Text style={themeStyles.p}>Desplegable</Text>
      </View> */}

      <View>
        <Text style={[themeStyles.p, { textAlign: "right" }]}>
          Versión: {version}
        </Text>
        <CustomButton
          size={"large"}
          text="Ver el tutorial"
          onPress={() => handleNavigation(router)}
        />
      </View>
    </View>
  );
}

function handleNavigation(router) {
  router.push({ pathname: "/(modals)/tutorial" });
}

const styles = StyleSheet.create({
  settingContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveGap(20),
  },
});
