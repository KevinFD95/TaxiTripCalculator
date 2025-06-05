import { useCallback, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
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
        <ScrollView>
          <Text style={[themeStyles.h4, styles.titleStyle]}>Tarifa</Text>
          <View style={styles.rowContainer}>
            <Text style={themeStyles.h6}>Horario:</Text>
            <Text style={themeStyles.h6}>{item.time}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={themeStyles.h6}>Tarifa:</Text>
            <Text style={themeStyles.h6}>{item.tariff}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={themeStyles.h6}>Precio bajada de bandera:</Text>
            <Text style={themeStyles.h6}>{item.flagPrice}€</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={themeStyles.h6}>Distancia:</Text>
            <Text style={themeStyles.h6}>{item.distance}km</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={themeStyles.h6}>Precio del km:</Text>
            <Text style={themeStyles.h6}>{item.priceKm}€/km</Text>
          </View>

          <View style={styles.suppliesContainer}>
            <Text style={[themeStyles.h4, styles.titleStyle]}>Suplementos</Text>

            {item.toll !== 0 && (
              <View style={styles.rowContainer}>
                <Text style={themeStyles.h6}>Peaje:</Text>
                <Text style={themeStyles.h6}>{item.toll}€</Text>
              </View>
            )}

            {item.supplements.pick && (
              <View style={styles.rowContainer}>
                <Text style={themeStyles.h6}>Recogida:</Text>
                <Text style={themeStyles.h6}>
                  {item.supplements.pickPrice}€
                </Text>
              </View>
            )}

            {item.supplements.group && (
              <View style={styles.rowContainer}>
                <Text style={themeStyles.h6}>Grupo:</Text>
                <Text style={themeStyles.h6}>
                  {item.supplements.groupPrice}€
                </Text>
              </View>
            )}

            {item.supplements.airport && (
              <View style={styles.rowContainer}>
                <Text style={themeStyles.h6}>Aeropuerto:</Text>
                <Text style={themeStyles.h6}>
                  {item.supplements.airportPrice}€
                </Text>
              </View>
            )}

            {item.supplements.station && (
              <View style={styles.rowContainer}>
                <Text style={themeStyles.h6}>Salida de estación:</Text>
                <Text style={themeStyles.h6}>
                  {item.supplements.stationPrice}€
                </Text>
              </View>
            )}

            {item.supplements.suitcase > 0 && (
              <View style={styles.rowContainer}>
                <View>
                  <Text style={themeStyles.h6}>
                    Maletas: {item.supplements.suitcase}u
                  </Text>
                  <Text style={themeStyles.h6}>
                    Precio por maleta: {item.supplements.suitcasePrice}€/u
                  </Text>
                </View>
                <Text style={themeStyles.h6}>{suitcaseTotal}€</Text>
              </View>
            )}
          </View>

          <View style={[styles.rowContainer, styles.totalPriceContainer]}>
            <Text style={themeStyles.h6}>Precio total:</Text>
            <Text style={themeStyles.h1}>{item.totalPrice}€</Text>
          </View>
        </ScrollView>
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
    gap: 5,
  },

  titleStyle: {
    textAlign: "center",
    marginVertical: 10,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  suppliesContainer: {
    gap: 5,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalPriceContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
});
