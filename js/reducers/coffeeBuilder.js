/**
 * mode: idle, countDown, pending, working, done
 */
const initialState = {
  mode: 'idle',
  datas: [],
  totalSeconds: 0,
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
        };
      }

      return Object.assign({}, state, {
        mode: action.mode
      });

    case "COFFEE_BUILDER_DATA_REMOVE_LAST_SECOND":
      console.log('remove last second data')
      console.log('before remove ' + state.datas.length)
      if (state.datas.length <= 10) return state;

      console.log('after remove ' + state.datas.slice(0, -10).length)
      return {
        ...state,
        datas: state.datas.slice(0, -10),
      };

    case "COFFEE_BUILDER_QUEUE_DATA":
      return {
        ...state,
        datas: [ ...state.datas, action.data],
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
