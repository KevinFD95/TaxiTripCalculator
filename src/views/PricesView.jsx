import { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { useAlert } from "../context/AlertContext";
import { useSettings } from "../context/SettingsContext";

import { globalStyles } from "../styles/globalStyles";

import {
  loadSettings,
  saveSettings,
  handleNumber,
} from "../services/pricesService.js";

import { CustomButton } from "../components/CustomButtonComponent";
import { CustomTextInput } from "../components/CustomTextInputComponent";

export default function PricesView() {
  const { theme } = useTheme();
  const { showAlert } = useAlert();
  const { settings, setSettings } = useSettings();

  const themeStyles = globalStyles(theme);

  const [dayTimePrice, setDayTimePrice] = useState(0.0);
  const [dayTimeIntPrice, setDayTimeIntPrice] = useState(0.0);
  const [dayKmPrice, setDayKmPrice] = useState(0.0);

  const [nightTimePrice, setNightTimePrice] = useState(0.0);
  const [nightTimeIntPrice, setNightTimeIntPrice] = useState(0.0);
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
      setDayTimeIntPrice,
      setDayKmPrice,
      setNightTimePrice,
      setNightTimeIntPrice,
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
            <Text style={[themeStyles.h4, { marginBottom: 10 }]}>Diurna:</Text>
            <Text style={themeStyles.h5}>Bajada de bandera (€)</Text>
            <View style={styles.rowSection}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Urbana</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={dayTimePrice}
                  onChangeText={(text) => setDayTimePrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Interurbana</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={dayTimeIntPrice}
                  onChangeText={(text) =>
                    setDayTimeIntPrice(handleNumber(text))
                  }
                  type="numeric"
                />
              </View>
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
          <View>
            <Text style={[themeStyles.h4, { marginBottom: 10 }]}>
              Nocturna:
            </Text>
            <Text style={themeStyles.h5}>Bajada de bandera (€)</Text>
            <View style={styles.rowSection}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Urbana</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={nightTimePrice}
                  onChangeText={(text) => setNightTimePrice(handleNumber(text))}
                  type="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.h6}>Interurbana</Text>
                <CustomTextInput
                  size={"large"}
                  placeholder={"€"}
                  value={nightTimeIntPrice}
                  onChangeText={(text) =>
                    setNightTimeIntPrice(handleNumber(text))
                  }
                  type="numeric"
                />
              </View>
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
            dayTimeIntPrice,
            dayKmPrice,
            nightTimePrice,
            nightTimeIntPrice,
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
