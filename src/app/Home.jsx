import { createStackNavigator } from "@react-navigation/stack";

import HomeView from "../views/HomeView.jsx";
import DetailsView from "../views/DetailsView.jsx";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeView"
    >
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="DetailsView" component={DetailsView} />
    </Stack.Navigator>
  );
}
