import { View, Text, FlatList } from "react-native";

import { useTheme } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useHistory } from "../context/HistoryContext.jsx";

import { globalStyles } from "../styles/globalStyles.js";

import Card from "../components/CardComponent.jsx";
import { CustomButton } from "../components/CustomButtonComponent.jsx";
import { useRouter } from "expo-router";

export default function HomeView() {
  const router = useRouter();

  const { theme } = useTheme();
  const { showConfirm } = useAlert();
  const { history, delOp, cleanHistory } = useHistory();

  const themeStyles = globalStyles(theme);

  return (
    <View style={themeStyles.mainContainer}>
      {history.length > 0 ? (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <FlatList
            style={{ flex: 1 }}
            data={history}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <Card
                title={item.title}
                date={item.date}
                price={item.totalPrice + "€"}
                onPress={() => handleCardPress(router, item)}
                onLongPress={() => {
                  showConfirm({
                    title: "Borrar viaje",
                    message: "¿Estás seguro que quieres borrar este cálculo?",
                    onConfirm: () => delOp(item.id),
                  });
                }}
              />
            )}
            contentContainerStyle={{ gap: 20 }}
          />
          <CustomButton
            text={"Limpiar historial"}
            size={"large"}
            onPress={() => {
              showConfirm({
                title: "Limpiar historial",
                message: "¿Estás seguro que quieres limpiar el historial?",
                onConfirm: () => cleanHistory(),
              });
            }}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={themeStyles.h6}>El historial está vacío</Text>
        </View>
      )}
    </View>
  );
}

function handleCardPress(router, item) {
  router.push({ pathname: "/(modals)/[id]", params: { id: item.id } });
}

const styles = {
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
