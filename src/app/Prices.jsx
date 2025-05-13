import { createStackNavigator } from "@react-navigation/stack";

import PricesView from "../views/PricesView";

const Stack = createStackNavigator();

export default function PricesNav() {
  return (
    <Stack.Navigator
      initialRouteName="PricesView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PricesView" component={PricesView} />
    </Stack.Navigator>
  );
}
