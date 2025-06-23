import { Share } from "react-native";

import { encodeItem } from "../helpers/codeDetails.js";

export function showSupplementsSection(supplements, toll) {
  const hasTrueSupplement = Object.values(supplements).some(
    (values) => values === true,
  );
  return toll !== 0 || hasTrueSupplement || supplements.suitcase > 0;
}

export function handleSave(item, inputValue, history, updateOp, addOp) {
  const updatedItem = { ...item, title: inputValue };

  const exists = history.some((op) => op.id === item.id);

  if (exists) {
    updateOp(updatedItem);
  } else {
    addOp(updatedItem);
  }
}

export async function handleShare(item) {
  const encoded = encodeItem(item);
  const url = `https://taxicalc.infinityfreeapp.com/?data=${encoded}`;

  await Share.share({
    message: `Mira este cálculo: ${url}`,
  });
}
