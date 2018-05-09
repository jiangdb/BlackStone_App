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
        historyList:[
         ...state.historyList,
         action.record
        ]
      }

    default:
      return state;
  }
}

module.exports = history;
