// Configuración específica para toasts en web
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export const getToastConfig = (customToast) => {
  if (Platform.OS === "web") {
    return {
      ...customToast,
      // Configuración específica para web
      position: "top",
      visibilityTime: 3000,
      topOffset: 60,
      bottomOffset: 40,
    };
  }

  return customToast;
};

// Configuración específica para mostrar toasts en web
export const showToastWeb = (type, text1, text2 = null) => {
  if (Platform.OS === "web") {
    // Configuración optimizada para web
    Toast.show({
      type,
      text1,
      text2,
      position: "top",
      visibilityTime: 3000,
      topOffset: 60,
      autoHide: true,
    });
  } else {
    // Configuración normal para mobile
    Toast.show({
      type,
      text1,
      text2,
      position: "bottom",
      visibilityTime: 2000,
    });
  }
};
