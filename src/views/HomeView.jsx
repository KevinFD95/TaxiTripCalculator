import { View, Text, FlatList } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

import Card from "../components/CardComponent.jsx";
import { CustomButton } from "../components/CustomButtonComponent.jsx";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function HomeNav() {
  const navigation = useNavigation();

  const { theme } = useTheme();
  const { history, delOp, cleanHistory } = useHistory();

  const themeStyles = globalStyles(theme);

  const handleCardPress = (item) => {
    navigation.navigate("DetailsView", { item });
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Principal" });
    }, [navigation]),
  );

  return (
    <View style={themeStyles.mainContainer}>
      {history.length > 0 ? (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <FlatList
            data={history}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <Card
                title={item.title}
                date={item.date}
                price={item.totalPrice + "€"}
                onPress={() => handleCardPress(item)}
                onLongPress={() => delOp(item.id)}
              />
            )}
            contentContainerStyle={{ gap: 20 }}
          />
          <CustomButton
            text={"Limpiar historial"}
            size={"large"}
            onPress={cleanHistory}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{ color: theme["color-text"] }}>
            El historial está vacío
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
