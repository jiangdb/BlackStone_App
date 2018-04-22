const initialState = {
  history: [
  ],
}
 
import type { Action } from "../actions/types";

function saveRecord(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_RECORD":
      return Object.assign({}, state, {
        beanCategoryData: [
          ...state.history,
          action.record
        ]
      })

    default:
      return state;
  }
}

module.exports = flavorSelect;
