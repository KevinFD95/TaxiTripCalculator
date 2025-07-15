import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Platform } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";
import {
  responsivePadding,
  responsiveIconSize,
  responsiveGap,
} from "../utils/responsive.js";

import {
  calculate,
  getFlagPrice,
  handleDistance,
  handleToll,
} from "../services/calculatorService.js";

import {
  CustomButton,
  CustomIconButton,
} from "../components/CustomButtonComponent.jsx";
import { CustomTextInput } from "../components/CustomTextInputComponent.jsx";

import CheckboxIcon from "../../assets/icons/CheckboxIcon.jsx";
import RadiobuttonIcon from "../../assets/icons/RadiobuttonIcon.jsx";
import AddIcon from "../../assets/icons/AddIcon.jsx";
import RemoveIcon from "../../assets/icons/RemoveIcon.jsx";

export default function CalculatorView() {
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const { settings } = useSettings();
  const { addOp } = useHistory();

  const themeStyles = globalStyles(theme);

  const [distance, setDistance] = useState("");
  const [toll, setToll] = useState(0.0);

  const [time, setTime] = useState("day");
  const isDay = time === "day";

  const [area, setArea] = useState("urban");
  const isUrban = area === "urban";

  const [supplement, setSupplement] = useState({
    pick: false,
    group: false,
    airport: false,
    station: false,
    suitcase: 0,
  });

  const toggleSupplement = (key) => {
    setSupplement((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  let [result, setResult] = useState("0.00");

  // Tamaños responsivos
  const iconSizeLarge = responsiveIconSize(32);
  const iconSizeSmall = responsiveIconSize(24);

  return (
    <View style={[themeStyles.mainContainer, { flex: 1 }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: responsiveGap(20) }}
      >
        <View style={styles(theme).section}>
          <Text style={themeStyles.h6}>Introduce la distancia (km):</Text>
          <CustomTextInput
            size={"large"}
            placeholder={"Selecciona la ruta para la distancia real"}
            value={distance}
            onChangeText={(text) => setDistance(handleDistance(text))}
            keyboardType="numeric"
          />

          <Text style={themeStyles.h6}>Introduce el precio del peaje:</Text>
          <CustomTextInput
            size={"large"}
            placeholder={"Precio en euros"}
            value={toll}
            onChangeText={(text) => setToll(handleToll(text))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles(theme).section}>
          <Text style={[themeStyles.h4, { marginBottom: 10 }]}>Tarifa: </Text>

          <View style={styles(theme).radiobuttonContainer}>
            <View style={styles(theme).tariffSection}>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setTime("day")}
                  icon={
                    <RadiobuttonIcon size={iconSizeLarge} checked={isDay} />
                  }
                />
                <Text style={themeStyles.h6}>Diurna</Text>
              </View>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setArea("urban")}
                  icon={
                    <RadiobuttonIcon size={iconSizeLarge} checked={isUrban} />
                  }
                />
                <Text style={themeStyles.h6}>Urbana</Text>
              </View>
            </View>
            <View style={styles(theme).tariffSection}>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setTime("night")}
                  icon={
                    <RadiobuttonIcon size={iconSizeLarge} checked={!isDay} />
                  }
                />
                <Text style={themeStyles.h6}>Nocturna</Text>
              </View>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setArea("interurban")}
                  icon={
                    <RadiobuttonIcon size={iconSizeLarge} checked={!isUrban} />
                  }
                />
                <Text style={themeStyles.h6}>Interurbana</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles(theme).valuesSection}>
          <Text style={[styles(theme).section, themeStyles.p]}>
            Bajada de bandera: {getFlagPrice(isDay, isUrban, settings)}€
          </Text>
          <Text style={[styles(theme).section, themeStyles.p]}>
            Precio del km: {isDay ? settings.dayKmPrice : settings.nightKmPrice}
            €
          </Text>
        </View>

        <View style={styles(theme).section}>
          <Text style={[themeStyles.h4, { marginBottom: 10 }]}>
            Suplementos:
          </Text>

          <View style={styles(theme).checkboxContainer}>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("pick")}
                icon={
                  <CheckboxIcon
                    size={iconSizeLarge}
                    checked={supplement.pick}
                  />
                }
              />
              <Text style={themeStyles.h6}>Recogida</Text>
            </View>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("group")}
                icon={
                  <CheckboxIcon
                    size={iconSizeLarge}
                    checked={supplement.group}
                  />
                }
              />
              <Text style={themeStyles.h6}>Grupo</Text>
            </View>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("airport")}
                icon={
                  <CheckboxIcon
                    size={iconSizeLarge}
                    checked={supplement.airport}
                  />
                }
              />
              <Text style={themeStyles.h6}>Aeropuerto</Text>
            </View>
          </View>
          <View style={styles(theme).checkboxContainer}>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("station")}
                icon={
                  <CheckboxIcon
                    size={iconSizeLarge}
                    checked={supplement.station}
                  />
                }
              />
              <Text style={themeStyles.h6}>Salida de estacion</Text>
            </View>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() =>
                  setSupplement((prev) => ({
                    ...prev,
                    suitcase: prev.suitcase > 0 ? prev.suitcase - 1 : 0,
                  }))
                }
                icon={<RemoveIcon size={iconSizeSmall} />}
              />
              <Text style={[themeStyles.h6, { fontSize: 24 }]}>
                {supplement.suitcase}
              </Text>
              <CustomIconButton
                onPress={() =>
                  setSupplement((prev) => ({
                    ...prev,
                    suitcase: prev.suitcase + 1,
                  }))
                }
                icon={<AddIcon size={iconSizeSmall} />}
              />
              <Text style={themeStyles.h6}>Maletas</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles(theme).footer}>
        <View style={styles(theme).resultContainer}>
          <Text style={[themeStyles.h1, { textAlign: "center" }]}>
            {result}€
          </Text>
        </View>

        <CustomButton
          size={"large"}
          text={"Calcular precio"}
          onPress={() => {
            showAlert({
              title: "Éxito",
              message: "Cálculo realizado correctamente",
            });

            setResult(
              calculate(
                showAlert,
                settings,
                addOp,
                isDay,
                isUrban,
                supplement,
                distance,
                toll,
              ),
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    section: {
      marginBottom: responsiveGap(20),
      gap: responsiveGap(10),
    },

    valuesSection: {
      flexDirection: "row",
      gap: responsiveGap(15),
      justifyContent: "center",
    },

    iconLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: responsiveGap(5),
    },

    tariffSection: {
      gap: responsiveGap(5),
      width: "50%",
    },

    radiobuttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },

    checkboxContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: responsiveGap(10),
    },

    footer: {
      paddingTop: responsivePadding(20),
      backgroundColor: theme["app-background"],
      justifyContent: "space-between",
      flexShrink: 0,
      ...(Platform.OS === "web" && {
        position: "sticky",
        bottom: 0,
        zIndex: 100,
      }),
    },

    resultContainer: {
      paddingVertical: responsiveGap(10),
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
