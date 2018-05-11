const initialState = {
  show: true
}
 
import type { Action } from "../actions/types";

function showStep(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "STEP_STATE_CHANGE":
      return Object.assign({}, state, action.state)

    default:
      return state;
  }
}

module.exports = showStep;
