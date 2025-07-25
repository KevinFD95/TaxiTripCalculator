import { Pressable, View, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { responsivePadding } from "../utils/responsive.js";

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
      style={({ pressed }) => [
        styles(theme).cardContainer,
        pressed && { opacity: 0.6 },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View style={styles(theme).dataContainer}>
        <Text style={themeStyles.h4}>{title}</Text>
        <Text style={themeStyles.p}>{date}</Text>
      </View>
      <View style={styles(theme).priceContainer}>
        <Text style={themeStyles.h2}>{price}</Text>
      </View>
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
      padding: responsivePadding(10),
      shadowOffset: { width: 0, height: 5 },
      shadowColor: theme["input-border-color"],
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },

    dataContainer: {
      width: "60%",
    },

    priceContainer: {
      width: "40%",
      alignItems: "flex-end",
    },
  });
};
