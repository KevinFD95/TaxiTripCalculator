import { useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

import { CustomTextInput } from "../components/CustomTextInputComponent.jsx";
import { CustomButton } from "../components/CustomButtonComponent.jsx";
import { useAlert } from "../context/AlertContext.jsx";

export default function DetailsView({ navigation, route }) {
  const { item } = route.params;

  const { theme } = useTheme();
  const { showAlert } = useAlert();
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
            <Text style={themeStyles.h3}>Título:</Text>
            <Text style={themeStyles.h6}>Fecha: {item.date}</Text>
          </View>
          <CustomTextInput
            size={"large"}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>

        <Text style={themeStyles.h6}>Tarifa: {item.tariff}</Text>
        <Text style={themeStyles.h6}>
          Precio bajada de bandera: {item.flagPrice}€
        </Text>
        <Text style={themeStyles.h6}>Distancia: {item.distance}km</Text>
        <Text style={themeStyles.h6}>Precio del km: {item.priceKm}€/km</Text>

        <View style={styles.suppliesContainer}>
          {item.toll !== 0 && (
            <Text style={themeStyles.h6}>Peaje: {item.toll}</Text>
          )}

          {item.supplements.pick && (
            <Text style={themeStyles.h6}>
              Recogida: {item.supplements.pickPrice}€
            </Text>
          )}

          {item.supplements.group && (
            <Text style={themeStyles.h6}>
              Grupo: {item.supplements.groupPrice}€
            </Text>
          )}

          {item.supplements.airport && (
            <Text style={themeStyles.h6}>
              Aeropuerto: {item.supplements.airportPrice}
            </Text>
          )}

          {item.supplements.station && (
            <Text style={themeStyles.h6}>
              Salida de estación: {item.supplements.stationPrice}
            </Text>
          )}

          {item.supplements.suitcase > 0 && (
            <View style={styles.rowContainer}>
              <View>
                <Text style={themeStyles.h6}>
                  Maletas: {item.supplements.suitcase}
                </Text>
                <Text style={themeStyles.h6}>
                  Precio por maleta: {item.supplements.suitcasePrice}€
                </Text>
              </View>
              <Text style={themeStyles.h6}>Total: {suitcaseTotal}</Text>
            </View>
          )}
        </View>

        <View style={[styles.rowContainer, styles.totalPriceContainer]}>
          <Text style={themeStyles.h6}>Precio total:</Text>
          <Text style={themeStyles.h1}>{item.totalPrice}€</Text>
        </View>
      </View>
      <CustomButton
        size={"large"}
        text={"Guardar cambios"}
        onPress={() => {
          showAlert({
            title: "Éxito",
            message: "Título guardado correctamente",
          });
          handleSaveTitle();
        }}
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

  suppliesContainer: {
    gap: 20,
  },

  totalPriceContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
