export type Action =
  | { type: "BLE_FIND_DEVICE", device: Object }
  | { type: "BLE_ON_BT_STATE_CHANGE", state: string }
  | { type: "BLE_ON_CONNECTION_STATE_CHANGE", state: string, device: Object }
  | { type: "BLE_ON_DEVICE_INFO_CHANGE", info: Object }
  | { type: "BLE_START_SCAN" }
  | { type: "BLE_STOP_SCAN" }
  | { type: "SAVE_COFFEE_SETTINGS", settings: Object };
