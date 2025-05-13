import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

export default function HomeNav() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = globalStyles(theme);

  return (
    <View style={themeStyles.mainContainer}>
      <Text>Vista home</Text>
    </View>
  );
}
