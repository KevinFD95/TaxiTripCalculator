import { View, Text, StyleSheet, Platform } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { globalStyles } from "../styles/globalStyles.js";
import { responsivePadding } from "../utils/responsive.js";

export default function CustomToast({ text1, text2 }) {
  const { theme } = useTheme();
  const themeStyles = globalStyles(theme);

  return (
    <View style={styles(theme).container}>
      <Text style={[themeStyles.h6, styles(theme).title]}>{text1}</Text>
      {text2 && <Text style={themeStyles.p}>{text2}</Text>}
    </View>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme["app-background"],
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme["input-border-color"],
      padding: responsivePadding(16),
      marginHorizontal: responsivePadding(20),
      marginTop: responsivePadding(20),
      alignSelf: "stretch",
      alignItems: "center",
      // Mejorar para web
      ...(Platform.OS === "web" && {
        position: "relative",
        zIndex: 9999,
        maxWidth: 400,
        alignSelf: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }),
      // Sombras para mobile
      ...(Platform.OS !== "web" && {
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }),
    },
    title: {
      marginBottom: 4,
    },
  });
};
