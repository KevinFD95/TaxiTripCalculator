import { View } from "react-native";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { HistoryProvider } from "./context/HistoryContext.jsx";
import { ExpoRoot } from "expo-router";

export default function App() {
  const ctx = require.context("./app");
  return (
    <ThemeProvider>
      <AlertProvider>
        <SettingsProvider>
          <HistoryProvider>
            <View style={{ flex: 1 }}>
              <ExpoRoot context={ctx} />
            </View>
          </HistoryProvider>
        </SettingsProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
