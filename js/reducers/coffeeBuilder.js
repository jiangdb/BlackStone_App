const initialState = {
  mode: 'mode_countDown',
}
 
import type { Action } from "../actions/types";

function coffeeBuilder(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "COFFEE_BUILDER_MODE_CHANGE":
      return Object.assign({}, state, {
        mode: action.mode
      });

    default:
      return state;
  }
}

module.exports = coffeeBuilder;
