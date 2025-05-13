import { StyleSheet } from "react-native";

export const globalStyles = (theme) => {
  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme["app-background"],
    },
  });
};
