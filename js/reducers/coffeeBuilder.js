/**
 * mode: idle, countDown, pending, working, done
 */
const initialState = {
  mode: 'idle',
  datas: [],
  accessories: [],
  flavors: [],
  totalSeconds: 0,
    //chartTotal: [],
    //chartExtract: []
}
 
import type { Action } from "../actions/types";

function coffeeBuilder(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "COFFEE_BUILDER_MODE_CHANGE":
      if (action.mode == 'countDown') {
        // countdown means we start a new builder, need clear existing data
        return {
          ...state,
          mode: action.mode,
          datas: [],
          accessories: [],
          flavors: [],
        };
      }

      return Object.assign({}, state, {
        mode: action.mode
      });

    case "COFFEE_BUILDER_DATA_REMOVE_LAST_SECOND":
      if (state.datas.length <= 10) return state;

      return {
        ...state,
        datas: state.datas.slice(0, -10),
          //chartTotal: state.chartTotal.slice(0, -10),
          //chartExtract: state.chartExtract.slice(0, -10),
      };

    case "COFFEE_BUILDER_QUEUE_DATA":
      return {
        ...state,
        datas: [ ...state.datas, action.data],
          /*
        chartTotal: [
          ...state.chartTotal,
          {
            x: action.data.time,
            y: action.data.total
          }
        ],
        chartExtract: [
          ...state.chartExtract,
          {
            x: action.data.time,
            y: action.data.extract
          }
        ]
        */
      };

    case "SAVE_TIMER":
      return {
        ...state,
        totalSeconds: action.seconds,
      };
    default:
      return state;
  }
}

module.exports = coffeeBuilder;
