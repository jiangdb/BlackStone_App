const initialState = {
  filterOption: [
    {
      key: 1,
      name:'泰摩冰瞳滤杯',
      selected: false
    },
    {
      key: 2,
      name:'扇形滤杯',
      selected: false
    },
    {
      key: 3,
      name:'蛋糕滤杯',
      selected: false
    },
    {
      key: 4,
      name:'法兰绒',
      selected: false
    },
    {
      key: 5,
      name:'Chemex',
      selected: false
    },
    {
      key: 6,
      name:'Kono',
      selected: false
    },
    {
      key: 7,
      name:'V60',
      selected: false
    },
  ],
  kettleOption: [
    {
      key: 1,
      name:'泰摩鱼03',
      selected: false
    },
    {
      key: 2,
      name:'泰摩鱼04',
      selected: false
    },
    {
      key: 3,
      name:'Bonavita',
      selected: false
    },
    {
      key: 4,
      name:'Hario',
      selected: false
    },
    {
      key: 5,
      name:'Kalita',
      selected: false
    },
  ],
}
 
import type { Action } from "../actions/types";

function accessories(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SAVE_ACCESSORIES":
      return Object.assign({}, state, action.accessories);
    default:
      return state;
  }
}

module.exports = accessories;
