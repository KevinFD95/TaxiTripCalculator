import { StyleSheet } from "react-native";
import { responsiveFontSize, responsivePadding } from "../utils/responsive.js";

export const globalStyles = (theme) => {
  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      padding: responsivePadding(20),
      backgroundColor: theme["app-background"],
    },

    h1: {
      fontSize: responsiveFontSize(32),
      fontWeight: "bold",
      color: theme["color-text"],
    },

    h2: {
      fontSize: responsiveFontSize(28),
      fontWeight: 600,
      color: theme["color-text"],
    },

    h3: {
      fontSize: responsiveFontSize(24),
      fontWeight: 500,
      color: theme["color-text"],
    },

    h4: {
      fontSize: responsiveFontSize(20),
      fontWeight: 500,
      color: theme["color-text"],
    },

    h5: {
      fontSize: responsiveFontSize(18),
      fontWeight: 500,
      color: theme["color-text"],
    },

    h6: {
      fontSize: responsiveFontSize(16),
      fontWeight: 500,
      color: theme["color-text"],
    },

    p: {
      fontSize: responsiveFontSize(14),
      fontWeight: 400,
      color: theme["color-text"],
    },

    enfasis: {
      fontSize: responsiveFontSize(14),
      fontWeight: 500,
      fontStyle: "italic",
      color: theme["color-text"],
    },
  });
};
