import { Buffer } from "buffer";

export function encodeItem(item) {
  const json = JSON.stringify(item);
  const base64 = Buffer.from(json).toString("base64");
  return encodeURIComponent(base64);
}

export function decodeItem(encoded) {
  const decoded = decodeURIComponent(encoded);
  const json = Buffer.from(decoded, "base64").toString();
  return JSON.parse(json);
}
