import { useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

import { CustomTextInput } from "../components/CustomTextInputComponent.jsx";
import { CustomButton } from "../components/CustomButtonComponent.jsx";

export default function DetailsView({ navigation, route }) {
  const { item } = route.params;
  const { theme } = useTheme();
  const { updateOp } = useHistory();

  const [inputValue, setInputValue] = useState("");

  const themeStyles = globalStyles(theme);

  useEffect(() => {
    setInputValue(item.title);
  }, [item.title]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: item.title,
      });
    }, [navigation, item.title]),
  );

  const handleSaveTitle = () => {
    const updatedItem = { ...item, title: inputValue };
    updateOp(updatedItem);
    navigation.getParent()?.setOptions({ title: inputValue });
  };

  return (
    <View
      style={[themeStyles.mainContainer, { justifyContent: "space-between" }]}
    >
      <View style={styles.detailsContainer}>
        <View>
          <Text>Título:</Text>
          <CustomTextInput
            size={"large"}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text>Recogida:</Text>
          {item.supplements.pick ? (
            <Text>{item.supplements.pickPrice}</Text>
          ) : (
            <Text>No</Text>
          )}
        </View>
        <Text>Detalles</Text>
        <Text>Detalles</Text>
        <Text>Detalles</Text>
        <Text>{item.totalPrice}</Text>
      </View>
      <CustomButton
        size={"large"}
        text={"Guardar cambios"}
        onPress={() => handleSaveTitle()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
