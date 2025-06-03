import { StyleSheet } from "react-native";

export const globalStyles = (theme) => {
  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme["app-background"],
    },

    h1: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme["color-text"],
    },

    h2: {
      fontSize: 28,
      fontWeight: 600,
      color: theme["color-text"],
    },

    h3: {
      fontSize: 24,
      fontWeight: 500,
      color: theme["color-text"],
    },

    h4: {
      fontSize: 20,
      fontWeight: 500,
      color: theme["color-text"],
    },

    h5: {
      fontSize: 18,
      fontWeight: 500,
      color: theme["color-text"],
    },

    h6: {
      fontSize: 16,
      fontWeight: 500,
      color: theme["color-text"],
    },

    p: {
      fontSize: 14,
      fontWeight: 400,
      color: theme["color-text"],
    },

    enfasis: {
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "italic",
      color: theme["color-text"],
    },
  });
};
