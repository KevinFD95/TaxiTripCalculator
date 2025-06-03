import { Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "../context/ThemeContext";

const sizeMap = {
  large: "100%",
  medium: "66%",
  short: "33%",
};

export function CustomButton({ size, text, onPress }) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[styles(theme).buttonStyles, { width: sizeMap[size] ?? 0 }]}
      onPress={onPress}
    >
      <Text style={styles(theme).buttonText}>{text}</Text>
    </Pressable>
  );
}

export function CustomIconButton({ icon, onPress }) {
  return <Pressable onPress={onPress}>{icon}</Pressable>;
}

const styles = (theme) => {
  return StyleSheet.create({
    buttonStyles: {
      backgroundColor: theme["button-background"],
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme["button-border-color"],
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonText: {
      color: theme["button-text"],
      fontSize: 16,
      fontWeight: "500",
    },
  });
};
