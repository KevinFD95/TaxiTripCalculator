import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    dayTimePrice: "",
    dayKmPrice: "",
    nightTimePrice: "",
    nightKmPrice: "",
    pickPrice: "",
    groupPrice: "",
    airportPrice: "",
    stationPrice: "",
    casePrice: "",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem("userSettings");
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch {
        console.error("Error al cargar configuracion de usuario");
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("userSettings", JSON.stringify(settings));
      } catch {
        console.error("Error al guardar configuracion");
      }
    };

    saveSettings();
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
