import { createStackNavigator } from "@react-navigation/stack";

import CalculatorView from "../views/CalculatorView.jsx";

const Stack = createStackNavigator();

export default function CalculatorNav() {
  return (
    <Stack.Navigator
      initialRouteName="CalculatorView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CalculatorView" component={CalculatorView} />
    </Stack.Navigator>
  );
}
