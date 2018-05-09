const initialState = {
  chartExtract: [],
  chartTotal:[],
}
 
import type { Action } from "../actions/types";

function weightChart(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_BEAN_CATEGORY":
      return Object.assign({}, state, {
        data: [
          ...state.data,
          action.category
        ]
      })

    default:
      return state;
  }
}

module.exports = weightChart;
