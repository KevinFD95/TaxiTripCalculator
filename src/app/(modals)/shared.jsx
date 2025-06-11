import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import DetailsView from "../../views/DetailsView.jsx";

import { decodeItem } from "../../helpers/codeDetails.js";

export default function SharedModal() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { data } = params;

  const item = decodeItem(data);

  useEffect(() => {
    if (!item) {
      router.replace("/");
    }
  }, [router, item]);

  return <DetailsView item={item} />;
}
