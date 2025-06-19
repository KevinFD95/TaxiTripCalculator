import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

const HISTORIAL_KEY = "historial_de_calculos";

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getOps();
  }, []);

  const getOps = async () => {
    const data = await AsyncStorage.getItem(HISTORIAL_KEY);
    if (data) setHistory(JSON.parse(data));
  };

  const addOp = async (operation) => {
    const opWithId = {
      id: new Date().toISOString(),
      title: "Nuevo cálculo",
      ...operation,
    };
    const newHistory = [opWithId, ...history];
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORIAL_KEY, JSON.stringify(newHistory));
  };

  const updateOp = async (updatedItem) => {
    const newHistory = history.map((op) =>
      op.id === updatedItem.id ? updatedItem : op,
    );
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORIAL_KEY, JSON.stringify(newHistory));
  };

  const delOp = async (id) => {
    const newHistory = history.filter((op) => op.id !== id);
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORIAL_KEY, JSON.stringify(newHistory));
  };

  const cleanHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem(HISTORIAL_KEY);
  };

  return (
    <HistoryContext.Provider
      value={{ history, addOp, updateOp, delOp, cleanHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
