import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

export default function HomeNav() {
  const { theme } = useTheme();
  const themeStyles = globalStyles(theme);

  return (
    <View style={themeStyles.mainContainer}>
      <Text>Vista home</Text>
    </View>
  );
}
