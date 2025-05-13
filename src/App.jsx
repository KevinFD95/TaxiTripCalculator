import { View } from "react-native";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/TabNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AlertProvider>
          <View style={{ flex: 1 }}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </View>
        </AlertProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
