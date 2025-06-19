import { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

import {
  CustomButton,
  CustomIconButton,
} from "../components/CustomButtonComponent.jsx";
import { CustomTextInput } from "../components/CustomTextInputComponent.jsx";

import CheckboxIcon from "../../assets/icons/CheckboxIcon.jsx";
import RadiobuttonIcon from "../../assets/icons/RadiobuttonIcon.jsx";
import AddIcon from "../../assets/icons/AddIcon.jsx";
import RemoveIcon from "../../assets/icons/RemoveIcon.jsx";

import { formatDate } from "../helpers/dateFormatter.js";

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

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles(theme).section}>
          <Text style={themeStyles.h6}>Introduce la distancia (km):</Text>
          <CustomTextInput
            size={"large"}
            placeholder={"Selecciona la ruta para la distancia real"}
            value={distance}
            onChangeText={(text) => handleDistance(text, setDistance)}
            keyboardType="numeric"
          />

          <Text style={themeStyles.h6}>Introduce el precio del peaje:</Text>
          <CustomTextInput
            size={"large"}
            placeholder={"Precio en euros"}
            value={toll}
            onChangeText={(text) => handleToll(text, setToll)}
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
                  icon={<RadiobuttonIcon size={32} checked={isDay} />}
                />
                <Text style={themeStyles.h6}>Diurna</Text>
              </View>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setArea("urban")}
                  icon={<RadiobuttonIcon size={32} checked={isUrban} />}
                />
                <Text style={themeStyles.h6}>Urbana</Text>
              </View>
            </View>
            <View style={styles(theme).tariffSection}>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setTime("night")}
                  icon={<RadiobuttonIcon size={32} checked={!isDay} />}
                />
                <Text style={themeStyles.h6}>Nocturna</Text>
              </View>
              <View style={styles(theme).iconLabel}>
                <CustomIconButton
                  onPress={() => setArea("interurban")}
                  icon={<RadiobuttonIcon size={32} checked={!isUrban} />}
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
                icon={<CheckboxIcon size={32} checked={supplement.pick} />}
              />
              <Text style={themeStyles.h6}>Recogida</Text>
            </View>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("group")}
                icon={<CheckboxIcon size={32} checked={supplement.group} />}
              />
              <Text style={themeStyles.h6}>Grupo</Text>
            </View>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("airport")}
                icon={<CheckboxIcon size={32} checked={supplement.airport} />}
              />
              <Text style={themeStyles.h6}>Aeropuerto</Text>
            </View>
          </View>
          <View style={styles(theme).checkboxContainer}>
            <View style={styles(theme).iconLabel}>
              <CustomIconButton
                onPress={() => toggleSupplement("station")}
                icon={<CheckboxIcon size={32} checked={supplement.station} />}
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
                icon={<RemoveIcon size={24} />}
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
                icon={<AddIcon size={24} />}
              />
              <Text style={themeStyles.h6}>Maletas</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles(theme).footer}>
        <View style={{ flex: 1, justifyContent: "center" }}>
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
            calculatePrice(showAlert, distance, toll);
          }}
        />
      </View>
    </View>
  );

  function getFlagPrice(isDay, isUrban, settings) {
    if (isDay && isUrban) return settings.dayTimePrice;
    if (isDay && !isUrban) return settings.dayTimeIntPrice;
    if (!isDay && isUrban) return settings.nightTimePrice;
    return settings.nightTimeIntPrice;
  }

  function handleDistance(text, setDistance) {
    const onlyNumbers = text.replace(/[^0-9]/g, "");
    setDistance(onlyNumbers);
  }

  function handleToll(text, setToll) {
    const normalized = text.replace(",", ".");
    const cleaned = normalized.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    const result =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;

    setToll(result);
  }

  function calculatePrice(showAlert, distance, toll) {
    let supplements = 0;
    let totalPrice = 0;
    let result = 0;

    const numericDistance = isUrban
      ? parseFloat(distance) || 0
      : parseFloat(distance) - 3 || 0;

    const numericToll = parseFloat(toll) || 0;

    if (isNaN(numericDistance) || numericDistance === 0) {
      showAlert({ title: "Aviso", message: "Introduce distancia" });
      setResult(totalPrice.toFixed(2));
      return;
    }

    const flagPrice = parseFloat(getFlagPrice(isDay, isUrban, settings));

    const priceKm = parseFloat(
      isDay ? settings.dayKmPrice : settings.nightKmPrice,
    );

    supplements =
      parseFloat(supplement.pick ? settings.pickPrice : 0) +
      parseFloat(supplement.group ? settings.groupPrice : 0) +
      parseFloat(supplement.airport ? settings.airportPrice : 0) +
      parseFloat(supplement.station ? settings.stationPrice : 0) +
      parseFloat(supplement.suitcase * settings.casePrice);

    totalPrice = parseFloat(
      flagPrice + priceKm * numericDistance + numericToll + supplements,
    );

    result = totalPrice.toFixed(2);

    if (isNaN(result)) {
      result = "0.00";
    }

    setResult(result);

    addOp({
      id: new Date().toISOString(),
      title: "Nuevo cálculo",
      date: formatDate(new Date().toISOString()),
      distance: !isUrban ? numericDistance + 3 : numericDistance,
      toll: numericToll,
      time: isDay ? "Diurno" : "Nocturno",
      tariff: isUrban ? "Urbana" : "Interurbana",
      flagPrice,
      priceKm,
      supplements: {
        pick: supplement.pick,
        pickPrice: settings.pickPrice,
        group: supplement.group,
        groupPrice: settings.groupPrice,
        airport: supplement.airport,
        airportPrice: settings.airportPrice,
        station: supplement.station,
        stationPrice: settings.stationPrice,
        suitcase: supplement.suitcase,
        suitcasePrice: settings.casePrice,
      },
      totalPrice: result,
    });
  }
}

const styles = (theme) => {
  return StyleSheet.create({
    section: {
      marginBottom: 20,
      gap: 10,
    },

    valuesSection: {
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 40,
      justifyContent: "center",
    },

    iconLabel: {
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    tariffSection: {
      gap: 5,
      width: "50%",
    },

    radiobuttonContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },

    checkboxContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },

    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: theme["app-background"],
      height: 150,
      justifyContent: "space-between",
    },
  });
};
