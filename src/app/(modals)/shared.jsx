import { useLocalSearchParams } from "expo-router";

import DetailsView from "../../views/DetailsView.jsx";

import { decodeItem } from "../../helpers/shareDetails.js";

export default function SharedModal() {
  const params = useLocalSearchParams();
  const { data } = params;

  if (!data) return null;

  const item = decodeItem(data);

  return <DetailsView item={item} />;
}
