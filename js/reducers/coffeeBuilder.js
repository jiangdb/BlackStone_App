/**
 * mode: idle, countDown, pending, working, done
 */
const initialState = {
  mode: 'idle',
  datas: [],
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

    case "COFFEE_BUILDER_QUEUE_DATA":
      return {
        ...state,
        datas: [ ...state.datas, action.data],
      }
    default:
      return state;
  }
}

module.exports = coffeeBuilder;
