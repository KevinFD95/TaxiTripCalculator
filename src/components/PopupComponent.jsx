import { useTheme } from "../context/ThemeContext";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";

export function Popup({ visible, title, message, onClose }) {
  const { theme } = useTheme();
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles(theme).overlay}>
        <View style={styles(theme).alertBox}>
          <Text style={styles(theme).title}>{title}</Text>
          <Text style={styles(theme).message}>{message}</Text>
          <Pressable
            style={({ pressed }) => [
              styles(theme).button,
              pressed && { opacity: 0.6 },
            ]}
            onPress={onClose}
          >
            <Text style={styles(theme).buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export function ConfirmPopup({ visible, title, message, onConfirm, onCancel }) {
  const { theme } = useTheme();
  return (
    <Modal transparent visible={visible} animationType={"fade"}>
      <View style={styles(theme).overlay}>
        <View style={styles(theme).alertBox}>
          <Text style={styles(theme).title}>{title}</Text>
          <Text style={styles(theme).message}>{message}</Text>
          <View style={styles(theme).buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                pressed && { opacity: 0.6 },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles(theme).buttonText}>Sí</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                pressed && { opacity: 0.6 },
              ]}
              onPress={onCancel}
            >
              <Text style={styles(theme).buttonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    alertBox: {
      width: 300,
      maxHeight: "70%",
      backgroundColor: theme["app-background"],
      borderWidth: 1,
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      shadowColor: "#000000",
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.7,
      shadowRadius: 15,
      alignItems: "center",
      alignSelf: "center",
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme["color-text"],
      textAlign: "center",
      flexWrap: "wrap",
    },

    message: {
      fontSize: 16,
      textAlign: "center",
      color: theme["color-text"],
      flexWrap: "wrap",
    },

    buttonBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
    },

    button: {
      backgroundColor: theme["button-background"],
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: theme["input-border-color"],
      borderRadius: 5,
      marginTop: 30,
    },

    buttonText: {
      color: theme["button-text"],
      fontSize: 16,
      fontWeight: "500",
      textAlign: "center",
      paddingHorizontal: 15,
    },

    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
  });
};
