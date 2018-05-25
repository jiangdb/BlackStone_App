const initialState = {
  flavor:[],
  accessories:[],
}
 
import type { Action } from "../actions/types";

function saveRecord(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_SELECTED_FLAVOR":
      console.log(state.flavor)
    
      return Object.assign({}, state, action.flavor);

    case "SAVE_SELECTED_ACCESSORIES":
      return Object.assign({}, state, action.accessories)

    default:
      return state;
  }
}

module.exports = saveRecord;
