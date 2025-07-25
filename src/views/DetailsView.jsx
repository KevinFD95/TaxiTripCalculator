import { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";
import { responsiveIconSize, responsiveGap } from "../utils/responsive.js";
import { showToastWeb } from "../utils/toastUtils.js";

import { globalStyles } from "../styles/globalStyles.js";

import {
  showSupplementsSection,
  handleSave,
  handleShare,
} from "../services/detailsService.js";

import { CustomTextInput } from "../components/CustomTextInputComponent.jsx";
import {
  CustomButton,
  CustomIconButton,
} from "../components/CustomButtonComponent.jsx";

import ShareIcon from "../../assets/icons/ShareIcon.jsx";

export default function DetailsView({ item }) {
  const { theme } = useTheme();
  const { updateOp, addOp, history } = useHistory();

  const [inputValue, setInputValue] = useState("");

  const themeStyles = globalStyles(theme);
  const iconSize = responsiveIconSize(32);

  useEffect(() => {
    setInputValue(item.title);
  }, [item.title]);

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

          {showSupplementsSection(item.supplements, item.toll) && (
            <View style={styles.suppliesContainer}>
              <Text style={[themeStyles.h4, styles.titleStyle]}>
                Suplementos
              </Text>

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
          )}
        </ScrollView>

        <View style={[styles.rowContainer, styles.totalPriceContainer]}>
          <Text style={themeStyles.h6}>Precio total:</Text>
          <Text style={themeStyles.h1}>{item.totalPrice}€</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <CustomButton
            size={"large"}
            text={"Guardar"}
            onPress={() => {
              showToastWeb("success", "Cálculo guardado");
              handleSave(item, inputValue, history, updateOp, addOp);
            }}
          />
        </View>
        <View style={{ width: iconSize, height: iconSize }}>
          <CustomIconButton
            icon={<ShareIcon size={iconSize} />}
            onPress={() => handleShare(item)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    gap: responsiveGap(5),
  },

  titleStyle: {
    textAlign: "center",
    marginVertical: responsiveGap(10),
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  suppliesContainer: {
    gap: responsiveGap(5),
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
    marginBottom: responsiveGap(10),
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: responsiveGap(20),
  },
});
