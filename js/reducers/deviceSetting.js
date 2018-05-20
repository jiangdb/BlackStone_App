const initialState = {
  alarm: true,
  keySound: true,
  keyVibrate: true,
}
 
import type { Action } from "../actions/types";

function deviceSetting(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_ON_SAVE_DEVICE_SETTING":
      return Object.assign({}, state, action.settings)

    default:
      return state;
  }
}

module.exports = deviceSetting;