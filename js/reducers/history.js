const initialState = {
  historyList:[],
}
 
import type { Action } from "../actions/types";

function history(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_RECORD":
      return {
      }

    default:
      return state;
  }
}

module.exports = history;
