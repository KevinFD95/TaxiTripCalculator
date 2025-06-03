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

  const suitcaseTotal =
    item.supplements.suitcase * item.supplements.suitcasePrice;

  return (
    <View
      style={[themeStyles.mainContainer, { justifyContent: "space-between" }]}
    >
      <View style={styles.detailsContainer}>
        <View>
          <View style={styles.rowContainer}>
            <Text>Título:</Text>
            <Text>Fecha: {item.date}</Text>
          </View>
          <CustomTextInput
            size={"large"}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>

        <Text>Tarifa: {item.tariff}</Text>
        <Text>Precio bajada de bandera: {item.flagPrice}€</Text>
        <Text>Distancia: {item.distance}km</Text>
        <Text>Precio del km: {item.priceKm}€/km</Text>

        {item.toll !== 0 && <Text>Peaje: {item.toll}</Text>}

        {item.supplements.pick && (
          <Text>Recogida: {item.supplements.pickPrice}€</Text>
        )}

        {item.supplements.group && (
          <Text>Grupo: {item.supplements.groupPrice}€</Text>
        )}

        {item.supplements.airport && (
          <Text>Aeropuerto: {item.supplements.airportPrice}</Text>
        )}

        {item.supplements.station && (
          <Text>Salida de estación: {item.supplements.stationPrice}</Text>
        )}

        {item.supplements.suitcase > 0 && (
          <View style={styles.rowContainer}>
            <View>
              <Text>Maletas: {item.supplements.suitcase}</Text>
              <Text>Precio por maleta: {item.supplements.suitcasePrice}€</Text>
            </View>
            <Text>Total: {suitcaseTotal}</Text>
          </View>
        )}

        <Text>Precio total: {item.totalPrice}€</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
});
