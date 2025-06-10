import { Stack } from "expo-router";
import { linking } from "../../router.js";

export default function RootLayout() {
  return (
    <Stack
      linking={linking}
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    />
  );
}
