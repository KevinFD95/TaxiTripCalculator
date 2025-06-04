import { createStackNavigator } from "@react-navigation/stack";

import SettingsView from "../views/SettingsView.jsx";
import TutorialView from "../views/TutorialView.jsx";

const Stack = createStackNavigator();

export default function SettingsNav() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SettingsView" component={SettingsView} />
      <Stack.Screen name="TutorialView" component={TutorialView} />
    </Stack.Navigator>
  );
}
