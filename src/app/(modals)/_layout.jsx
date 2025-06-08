import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function ModalLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Toast />
    </>
  );
}
