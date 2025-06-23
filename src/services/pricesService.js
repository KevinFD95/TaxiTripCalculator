export function loadSettings(
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
) {
  setDayTimePrice(settings.dayTimePrice?.toString() || "0.00");
  setDayTimeIntPrice(settings.dayTimeIntPrice?.toString() || "0.00");
  setDayKmPrice(settings.dayKmPrice?.toString() || "0.00");
  setNightTimePrice(settings.nightTimePrice?.toString() || "0.00");
  setNightTimeIntPrice(settings.nightTimeIntPrice?.toString() || "0.00");
  setNightKmPrice(settings.nightKmPrice?.toString() || "0.00");
  setPickPrice(settings.pickPrice?.toString() || "0.00");
  setGroupPrice(settings.groupPrice?.toString() || "0.00");
  setAirportPrice(settings.airportPrice?.toString() || "0.00");
  setStationPrice(settings.stationPrice?.toString() || "0.00");
  setCasePrice(settings.casePrice?.toString() || "0.00");
}

export function saveSettings(
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
) {
  setSettings({
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
  });
}

export function handleNumber(text) {
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
