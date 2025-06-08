import CustomToast from "../components/ToastComponent.jsx";

export const customToast = {
  success: (props) => <CustomToast {...props} />,
  error: (props) => <CustomToast {...props} />,
  info: (props) => <CustomToast {...props} />,
};
