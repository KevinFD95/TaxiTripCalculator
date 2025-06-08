import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { customToast } from "../../services/customToastService.js";

export default function ModalLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Toast config={customToast} />
    </>
  );
}
