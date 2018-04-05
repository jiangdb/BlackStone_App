const initialState = {
    category: '曼特宁',
    ratioWater: 12,
    beanWeight: 20,
    waterWeight: 240,
    temperature: 92,
    grandSize: "3.5",
    time: 150,
    beanWeightReader: 200,
    waterWeightReader: 200,
}
 
import type { Action } from "../actions/types";

function coffeeSettings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_COFFEE_SETTINGS":
      console.log(Object.assign({}, state, action.settings))
      return Object.assign({}, state, action.settings)

    default:
      return state;
  }
}

module.exports = coffeeSettings;
