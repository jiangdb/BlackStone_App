export type Action =
  | { type: "SAVE_COFFEE_SETTINGS", settings: Object }
  | { type: "SAVE_BEAN_CATEGORY", category: Object }
  | { type: "SELECT_DEVICE", selectDevice: Object }
  | { type: "UNSELECT_DEVICE", unselectDevice: Object };
