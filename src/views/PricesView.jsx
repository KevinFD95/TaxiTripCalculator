import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import { useAlert } from "../context/AlertContext";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { CustomButton } from "../components/CustomButtonComponent";
import { CustomTextInput } from "../components/CustomTextInputComponent";
import { globalStyles } from "../styles/globalStyles";

export default function PricesView() {
  const { theme } = useTheme();
  const { settings, setSettings } = useSettings();
  const { showAlert } = useAlert();

  const themeStyles = globalStyles(theme);

  const [dayTimePrice, setDayTimePrice] = useState(0.0);
  const [dayKmPrice, setDayKmPrice] = useState(0.0);
  const [nightTimePrice, setNightTimePrice] = useState(0.0);
  const [nightKmPrice, setNightKmPrice] = useState(0.0);

  const [pickPrice, setPickPrice] = useState(0.0);
  const [groupPrice, setGroupPrice] = useState(0.0);
  const [airportPrice, setAirportPrice] = useState(0.0);
  const [stationPrice, setStationPrice] = useState(0.0);
  const [casePrice, setCasePrice] = useState(0.0);

  useEffect(() => {
    loadSettings(
      settings,
      setDayTimePrice,
      setDayKmPrice,
      setNightTimePrice,
      setNightKmPrice,
      setPickPrice,
      setGroupPrice,
      setAirportPrice,
      setStationPrice,
      setCasePrice,
    );
  }, [settings]);

  return (
    <View style={[themeStyles.mainContainer, { flex: 1 }]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[themeStyles.h2, { textAlign: "center" }]}>Tarifas</Text>

          <View>
            <Text style={themeStyles.h5}>Diurna:</Text>
            <View style={styles.rowSection}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Bajada de bandera (€)</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={dayTimePrice}
                  onChangeText={(text) => setDayTimePrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Precio del km (€/km)</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€/km"}
                  value={dayKmPrice}
                  onChangeText={(text) => setDayKmPrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={themeStyles.h5}>Nocturna:</Text>
            <View style={styles.rowSection}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Bajada de bandera (€)</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={nightTimePrice}
                  onChangeText={(text) => setNightTimePrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Precio del km (€/km)</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€/km"}
                  value={nightKmPrice}
                  onChangeText={(text) => setNightKmPrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[themeStyles.h2, { textAlign: "center" }]}>
            Suplementos
          </Text>
          <View style={styles.subsection}>
            <Text style={themeStyles.h6}>Recogida:</Text>
            <CustomTextInput
              size={"large"}
              placeholder={"Introduce el precio del suplemento en €"}
              value={pickPrice}
              onChangeText={(text) => setPickPrice(handleNumber(text))}
              type="numeric"
            />
          </View>
          <View style={styles.subsection}>
            <Text style={themeStyles.h6}>Grupo:</Text>
            <CustomTextInput
              size={"large"}
              placeholder={"Introduce el precio del suplemento en €"}
              value={groupPrice}
              onChangeText={(text) => setGroupPrice(handleNumber(text))}
              type="numeric"
            />
          </View>
          <View style={styles.subsection}>
            <Text style={themeStyles.h6}>Aeropuerto:</Text>
            <CustomTextInput
              size={"large"}
              placeholder={"Introduce el precio del suplemento en €"}
              value={airportPrice}
              onChangeText={(text) => setAirportPrice(handleNumber(text))}
              type="numeric"
            />
          </View>
          <View style={styles.subsection}>
            <Text style={themeStyles.h6}>Salida de estacion:</Text>
            <CustomTextInput
              size={"large"}
              placeholder={"Introduce el precio del suplemento en €"}
              value={stationPrice}
              onChangeText={(text) => setStationPrice(handleNumber(text))}
              type="numeric"
            />
          </View>
          <View style={styles.subsection}>
            <Text style={themeStyles.h6}>Precio maletas:</Text>
            <CustomTextInput
              size={"large"}
              placeholder={"Introduce el precio del suplemento en €"}
              value={casePrice}
              onChangeText={(text) => setCasePrice(handleNumber(text))}
              type="numeric"
            />
          </View>
        </View>
      </ScrollView>
      <CustomButton
        size={"large"}
        text={"Guardar datos"}
        onPress={() => {
          saveSettings(
            setSettings,
            dayTimePrice,
            dayKmPrice,
            nightTimePrice,
            nightKmPrice,
            pickPrice,
            groupPrice,
            airportPrice,
            stationPrice,
            casePrice,
          );
          showAlert({ title: "Aviso", message: "Datos guardados" });
        }}
      />
    </View>
  );
}

function loadSettings(
  settings,
  setDayTimePrice,
  setDayKmPrice,
  setNightTimePrice,
  setNightKmPrice,
  setPickPrice,
  setGroupPrice,
  setAirportPrice,
  setStationPrice,
  setCasePrice,
) {
  setDayTimePrice(settings.dayTimePrice?.toString() || "0.00");
  setDayKmPrice(settings.dayKmPrice?.toString() || "0.00");
  setNightTimePrice(settings.nightTimePrice?.toString() || "0.00");
  setNightKmPrice(settings.nightKmPrice?.toString() || "0.00");
  setPickPrice(settings.pickPrice?.toString() || "0.00");
  setGroupPrice(settings.groupPrice?.toString() || "0.00");
  setAirportPrice(settings.airportPrice?.toString() || "0.00");
  setStationPrice(settings.stationPrice?.toString() || "0.00");
  setCasePrice(settings.casePrice?.toString() || "0.00");
}

function saveSettings(
  setSettings,
  dayTimePrice,
  dayKmPrice,
  nightTimePrice,
  nightKmPrice,
  pickPrice,
  groupPrice,
  airportPrice,
  stationPrice,
  casePrice,
) {
  setSettings({
    dayTimePrice,
    dayKmPrice,
    nightTimePrice,
    nightKmPrice,
    pickPrice,
    groupPrice,
    airportPrice,
    stationPrice,
    casePrice,
  });
}

function handleNumber(text) {
  const normalized = text.replace(",", ".");
  const cleaned = normalized.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length === 1) {
    return parts[0];
  } else if (parts.length >= 2) {
    const integerPart = parts[0];
    const decimalPart = parts.slice(1).join("");
    return integerPart + "." + decimalPart.slice(0, 2);
  }
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  subsection: {
    marginBottom: 5,
  },
  rowSection: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
