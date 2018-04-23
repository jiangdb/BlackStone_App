const initialState = {
  extract: 0,
  total: 0,
}
 
import type { Action } from "../actions/types";

function bleWeightNotify(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case "BLE_ON_WEIGHT_CHANGE":
      return {
        ...state,
        ...action.weight
      }

    default:
      return state;
  }
}

module.exports = bleWeightNotify;
