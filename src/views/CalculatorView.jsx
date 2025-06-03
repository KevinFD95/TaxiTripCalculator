import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

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

export default function CalculatorNav() {
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const { settings } = useSettings();
  const { addOp } = useHistory();

  const themeStyles = globalStyles(theme);

  const [distance, setDistance] = useState("");
  const [toll, setToll] = useState(0.0);

  const [dayTime, setDayTime] = useState(true);
  const [nightTime, setNightTime] = useState(false);

  const [pick, setPick] = useState(false);
  const [group, setGroup] = useState(false);
  const [airport, setAirport] = useState(false);
  const [station, setStation] = useState(false);
  const [suitcase, setSuitcase] = useState(0);

  let [result, setResult] = useState("0.00");

  return (
    <View style={themeStyles.mainContainer}>
      <View style={styles.section}>
        <Text style={themeStyles.h6}>Introduce la distancia (km):</Text>
        <CustomTextInput
          size={"large"}
          placeholder={"Selecciona la ruta para la distancia real"}
          value={distance}
          onChangeText={(text) => handleDistance(text, setDistance)}
          type="numeric"
        />

        <Text style={themeStyles.h6}>Introduce el precio del peaje:</Text>
        <CustomTextInput
          size={"large"}
          placeholder={"Precio en euros"}
          value={toll}
          onChangeText={(text) => handleToll(text, setToll)}
          type="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={themeStyles.h6}>Tarifa: </Text>

        <View style={styles.radiobuttonContainer}>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => {
                setDayTime(true);
                setNightTime(false);
              }}
              icon={<RadiobuttonIcon size={32} checked={dayTime} />}
            />
            <Text style={themeStyles.h6}>Diurna</Text>
          </View>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => {
                setNightTime(true);
                setDayTime(false);
              }}
              icon={<RadiobuttonIcon size={32} checked={nightTime} />}
            />
            <Text style={themeStyles.h6}>Nocturna</Text>
          </View>
        </View>
      </View>

      <View style={styles.valuesSection}>
        <Text style={[styles.section, themeStyles.p]}>
          Bajada de bandera:{" "}
          {dayTime ? settings.dayTimePrice : settings.nightTimePrice}€
        </Text>
        <Text style={[styles.section, themeStyles.p]}>
          Precio del km: {dayTime ? settings.dayKmPrice : settings.nightKmPrice}
          €
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={themeStyles.h4}>Suplementos:</Text>

        <View style={styles.checkboxContainer}>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => setPick(!pick)}
              icon={<CheckboxIcon size={32} checked={pick} />}
            />
            <Text style={themeStyles.h6}>Recogida</Text>
          </View>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => setGroup(!group)}
              icon={<CheckboxIcon size={32} checked={group} />}
            />
            <Text style={themeStyles.h6}>Grupo</Text>
          </View>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => setAirport(!airport)}
              icon={<CheckboxIcon size={32} checked={airport} />}
            />
            <Text style={themeStyles.h6}>Aeropuerto</Text>
          </View>
          <View style={styles.iconLabel}>
            <CustomIconButton
              onPress={() => setStation(!station)}
              icon={<CheckboxIcon size={32} checked={station} />}
            />
            <Text style={themeStyles.h6}>Salida de estacion</Text>
          </View>
          <View>
            <View style={styles.iconLabel}>
              <CustomIconButton
                onPress={() =>
                  setSuitcase(suitcase > 0 ? suitcase - 1 : suitcase)
                }
                icon={<RemoveIcon size={24} />}
              />
              <Text style={[themeStyles.h6, { fontSize: 24 }]}>{suitcase}</Text>
              <CustomIconButton
                onPress={() => setSuitcase(suitcase + 1)}
                icon={<AddIcon size={24} />}
              />
              <Text style={themeStyles.h6}>Maletas</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
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

    const numericDistance = parseFloat(distance) || 0;
    const numericToll = parseFloat(toll) || 0;

    if (isNaN(numericDistance) || numericDistance === 0) {
      showAlert({ title: "Aviso", message: "Introduce distancia" });
      setResult(totalPrice.toFixed(2));
      return;
    }

    const flagPrice = parseFloat(
      dayTime ? settings.dayTimePrice : settings.nightTimePrice,
    );
    const priceKm = parseFloat(
      dayTime ? settings.dayKmPrice : settings.nightKmPrice,
    );

    supplements += parseFloat(pick ? settings.pickPrice : 0);
    supplements += parseFloat(group ? settings.groupPrice : 0);
    supplements += parseFloat(airport ? settings.airportPrice : 0);
    supplements += parseFloat(station ? settings.stationPrice : 0);
    supplements += parseFloat(suitcase * settings.casePrice);

    totalPrice = parseFloat(
      flagPrice + priceKm * numericDistance + numericToll + supplements,
    );

    result = totalPrice.toFixed(2);
    setResult(result);

    addOp({
      id: new Date().toISOString(),
      title: "Nuevo cálculo",
      date: formatDate(new Date().toISOString()),
      distance: numericDistance,
      toll: numericToll,
      tariff: dayTime ? "Diurna" : "Nocturna",
      flagPrice,
      priceKm,
      supplements: {
        pick,
        pickPrice: settings.pickPrice,
        group,
        groupPrice: settings.groupPrice,
        airport,
        airportPrice: settings.airportPrice,
        station,
        stationPrice: settings.stationPrice,
        suitcase: suitcase,
        suitcasePrice: settings.casePrice,
      },
      totalPrice: result,
    });
  }
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    gap: 5,
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

  radiobuttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  checkboxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
