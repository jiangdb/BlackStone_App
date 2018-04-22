const initialState = {
  flavorOption: [
    {
      key: 1,
      name:'茉莉',
      selected: false
    },
    {
      key: 2,
      name:'莓果',
      selected: false
    },
    {
      key: 3,
      name:'柠檬',
      selected: false
    },
    {
      key: 4,
      name:'柚子',
      selected: false
    },
    {
      key: 5,
      name:'苹果',
      selected: false
    },
    {
      key: 6,
      name:'番茄',
      selected: false
    },
  ],
}
 
import type { Action } from "../actions/types";

function flavorSelect(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_FLAVOR":
      return Object.assign({}, state, {flavorOption: action.flavor});
      console.log(state.flavorOption)

    default:
      return state;
  }
}

module.exports = flavorSelect;
