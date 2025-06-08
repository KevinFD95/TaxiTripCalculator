import { View } from "react-native";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { HistoryProvider } from "./context/HistoryContext.jsx";
import { ExpoRoot } from "expo-router";

// import { NavigationContainer } from "@react-navigation/native";
// import TabNavigator from "./app/TabNavigator";

export default function App() {
  const ctx = require.context("./app");
  return (
    <ThemeProvider>
      <AlertProvider>
        <SettingsProvider>
          <HistoryProvider>
            <View style={{ flex: 1 }}>
              {/* <NavigationContainer>
                <TabNavigator />
              </NavigationContainer> */}
              <ExpoRoot context={ctx} />
            </View>
          </HistoryProvider>
        </SettingsProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
