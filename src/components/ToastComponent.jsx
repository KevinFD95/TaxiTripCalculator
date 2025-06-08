import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { globalStyles } from "../styles/globalStyles.js";

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
      padding: 16,
      marginHorizontal: 20,
      marginTop: 20,
      alignSelf: "stretch",
      alignItems: "center",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
    },
    title: {
      marginBottom: 4,
    },
  });
};
