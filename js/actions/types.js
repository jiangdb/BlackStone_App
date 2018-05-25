export type Action =
  | { type: "BLE_DEVICE_READY"}
  | { type: "BLE_DEVICE_FORGET", device:Object }
  | { type: "BLE_DEVICE_SAVE", device:Object }
  | { type: "BLE_FIND_DEVICE", device: Object }
  | { type: "BLE_ON_BT_STATE_CHANGE", state: string }
  | { type: "BLE_ON_CONNECTION_STATE_CHANGE", state: string, device: Object }
  | { type: "BLE_ON_DEVICE_INFO_CHANGE", info: Object }
  | { type: "BLE_ON_WEIGHT_CHANGE", weight: Object }
  | { type: "BLE_ON_SAVE_DEVICE_SETTING", settings: Object }
  | { type: "BLE_START_SCAN" }
  | { type: "BLE_STOP_SCAN" }
  | { type: "COFFEE_BUILDER_DATA_REMOVE_LAST_SECOND" }
  | { type: "COFFEE_BUILDER_MODE_CHANGE", mode: Object }
  | { type: "COFFEE_BUILDER_QUEUE_DATA", data: Object }
  | { type: "REMOVE_RECORD", recordIndex: Object }
  | { type: "SAVE_COFFEE_SETTINGS", settings: Object }
  | { type: "SAVE_BEAN_CATEGORY", category: Object }
  | { type: "SAVE_FLAVOR", flavor: Object }
  | { type: "SAVE_RECORD", record: Object }
  | { type: "SAVE_ACCESSORIES", accessories: Object }
  | { type: "SAVE_TIMER", seconds: Object }
  | { type: "STEP_STATE_CHANGE", state: Object }
  | { type: "SAVE_SELECTED_FLAVOR", flavor: Object }
  | { type: "SAVE_SELECTED_ACCESSORIES", accessories: Object }
