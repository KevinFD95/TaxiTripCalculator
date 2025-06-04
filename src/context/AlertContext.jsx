import { createContext, useContext, useState } from "react";

import { ConfirmPopup, Popup } from "../components/PopupComponent.jsx";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: undefined,
    message: undefined,
  });

  const [confirmState, setConfirmState] = useState({
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

  const showConfirm = ({ title, message, onConfirm, onCancel }) => {
    setConfirmState({
      visible: true,
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  const hideConfirm = () => {
    setConfirmState({
      visible: false,
      title: undefined,
      message: undefined,
      onConfirm: undefined,
      onCancel: undefined,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <Popup
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        onClose={hideAlert}
      />
      <ConfirmPopup
        visible={confirmState.visible}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={() => {
          confirmState.onConfirm?.();
          hideConfirm();
        }}
        onCancel={() => {
          confirmState.onCancel?.();
          hideConfirm();
        }}
      />
    </AlertContext.Provider>
  );
};
