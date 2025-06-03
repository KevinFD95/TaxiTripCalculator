import { Pressable, View, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

export default function CardComponent({
  title,
  date,
  price,
  onPress,
  onLongPress,
}) {
  const { theme } = useTheme();
  const themeStyles = globalStyles(theme);

  return (
    <Pressable
      style={styles(theme).cardContainer}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View>
        <Text style={themeStyles.h4}>{title}</Text>
        <Text style={themeStyles.p}>{date}</Text>
      </View>

      <Text style={themeStyles.h2}>{price}</Text>
    </Pressable>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    cardContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme["app-background"],
      borderWidth: 1,
      borderColor: theme["input-border-color"],
      borderRadius: 10,
      padding: 10,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: theme["input-border-color"],
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
  });
};
