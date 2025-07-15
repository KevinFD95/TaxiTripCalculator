import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { linking } from "../../router.js";
import Toast from "react-native-toast-message";

import { useTheme } from "../context/ThemeContext.jsx";
import { customToast } from "../services/customToastService.js";

export default function RootLayout() {
  const { mode } = useTheme();

  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack
        linking={linking}
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Toast config={customToast} />
    </>
  );
}
