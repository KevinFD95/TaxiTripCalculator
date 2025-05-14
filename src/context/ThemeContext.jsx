import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import lightTheme from "../themes/lightTheme.js";
import darkTheme from "../themes/darkTheme.js";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme === "dark") {
        setTheme(darkTheme);
        setMode("dark");
      } else {
        setTheme(lightTheme);
        setMode("light");
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async (newMode) => {
    if (newMode === "dark") {
      setTheme(darkTheme);
      setMode("dark");
      await AsyncStorage.setItem("theme", "dark");
    } else {
      setTheme(lightTheme);
      setMode("light");
      await AsyncStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}
