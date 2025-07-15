import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isSmallScreen = width < 400;
export const isMediumScreen = width >= 400 && width < 768;
export const isLargeScreen = width >= 768;

export const responsiveFontSize = (size) => {
  if (isSmallScreen) {
    return size * 0.9;
  } else if (isMediumScreen) {
    return size;
  } else {
    return size * 1.1;
  }
};

export const responsivePadding = (padding) => {
  if (isSmallScreen) {
    return padding * 0.75;
  } else if (isMediumScreen) {
    return padding;
  } else {
    return padding * 1.25;
  }
};

export const responsiveIconSize = (size) => {
  if (isSmallScreen) {
    return size * 0.8;
  } else if (isMediumScreen) {
    return size;
  } else {
    return size * 1.2;
  }
};

// Función para gaps responsivos
export const responsiveGap = (gap) => {
  if (isSmallScreen) {
    return gap * 0.7;
  } else if (isMediumScreen) {
    return gap;
  } else {
    return gap * 1.3;
  }
};

export const responsiveHeight = (height) => {
  if (isSmallScreen) {
    return height * 0.8;
  } else if (isMediumScreen) {
    return height;
  } else {
    return height * 1.1;
  }
};

export const screenWidth = width;
export const screenHeight = height;
