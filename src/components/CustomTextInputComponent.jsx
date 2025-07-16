import { useState } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";

const sizeMap = {
  large: "100%",
  medium: "66%",
  short: "33%",
};

export function CustomTextInput({
  size,
  value,
  onChangeText,
  placeholder,
  type,
}) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const isNumeric = type === "numeric" || type === "decimal-pad";

  return (
    <TextInput
      style={[
        { width: sizeMap[size] ?? 0 },
        styles(theme).textInputStyle,
        isFocused && styles(theme).textInputStyleFocused,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={type}
      {...(Platform.OS === "web" && isNumeric ? { inputMode: "decimal" } : {})}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    textInputStyle: {
      backgroundColor: "#FFFFFF",
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme["input-border-color"],
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      textAlignVertical: "center",
    },
    textInputStyleFocused: {
      borderWidth: 3,
    },
  });
};
