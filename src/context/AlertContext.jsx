import { createContext, useContext, useState } from "react";

import { Popup } from "../components/PopupComponent.jsx";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: undefined,
    message: undefined,
  });

  const showAlert = ({ title, message }) => {
    setAlertState({
      visible: true,
      title,
      message,
    });
  };

  const hideAlert = () => {
    setAlertState({
      visible: false,
      title: undefined,
      message: undefined,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Popup
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};
