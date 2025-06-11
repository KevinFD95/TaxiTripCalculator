import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { linking } from "../../router.js";

import { useTheme } from "../context/ThemeContext.jsx";

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
    </>
  );
}
