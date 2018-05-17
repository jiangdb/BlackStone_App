const initialState = {
  scan: false,
  deviceScanned: [],
}
 
import type { Action } from "../actions/types";

function bleScan(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "BLE_FIND_DEVICE":
      let index = state.deviceScanned.findIndex( (e) => {
        return e.id == action.device.id;
      })

      if (index !== -1) return state

      return {
        ...state,
        deviceScanned: [ ...state.deviceScanned, action.device],
      }

    case "BLE_START_SCAN":
      return {
        ...state,
        scan: true,
        deviceScanned: []
      }

    case "BLE_STOP_SCAN":
      return {
        ...state,
        scan: false
      }

    default:
      return state;
  }
}

module.exports = bleScan;
