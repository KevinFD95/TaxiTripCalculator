import { formatDate } from "../helpers/dateFormatter.js";

export function getFlagPrice(isDay, isUrban, settings) {
  if (isDay && isUrban) return settings.dayTimePrice;
  if (isDay && !isUrban) return settings.dayTimeIntPrice;
  if (!isDay && isUrban) return settings.nightTimePrice;
  return settings.nightTimeIntPrice;
}

export function handleDistance(text) {
  const onlyNumbers = text.replace(/[^0-9]/g, "");
  return onlyNumbers;
}

export function handleToll(text) {
  const normalized = text.replace(",", ".");
  const cleaned = normalized.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  const result =
    parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;

  return result;
}

export function calculate(
  showAlert,
  settings,
  addOp,
  isDay,
  isUrban,
  supplement,
  distance,
  toll,
) {
  let supplements = 0;
  let totalPrice = 0;
  let result = 0;

  const numericDistance = isUrban
    ? parseFloat(distance) || 0
    : parseFloat(distance) - 3 || 0;

  const numericToll = parseFloat(toll) || 0;

  if (isNaN(numericDistance) || numericDistance === 0) {
    showAlert({ title: "Aviso", message: "Introduce distancia" });
    result = "0.00";
    return result;
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
    return result;
  }

  addOp({
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

  return result;
}
