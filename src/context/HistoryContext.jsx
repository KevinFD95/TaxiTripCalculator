import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

const HISTORIAL_KEY = "historial_de_calculos";

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(HISTORIAL_KEY);
      if (data) setHistory(JSON.parse(data));
    })();
  }, []);

  const addOp = async (operation) => {
    const opId = {
      id: Date.now().toString(),
      ...operation,
    };
    const newHistory = [opId, ...history];
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
    <HistoryContext.Provider value={{ history, addOp, delOp, cleanHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
