import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useHistory } from "../../context/HistoryContext.jsx";

import DetailsView from "../../views/DetailsView.jsx";

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { history } = useHistory();

  const item = history.find((entry) => entry.id?.toString() === id?.toString());

  useEffect(() => {
    if (!item) {
      router.replace("/");
    }
  }, [router, item]);

  if (!item) return null;

  return (
    <DetailsView
      item={item}
      naviagation={{ getParent: () => ({ setOptions: () => {} }) }}
    />
  );
}
