const initialState = {
    device: [
      {
        key: 1,
        deviceName: 'name1',
        deviceConnect: false,
      },
      {
        key: 2,
        deviceName: 'name2',
        deviceConnect: false,
      },
      {
        key: 3,
        deviceName: 'name3',
        deviceConnect: false,
      }
    ],
    selectedDevice: {
      deviceName: '',
      connectState: '未连接',
    }
}
 
import type { Action } from "../actions/types";

function deviceScan(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SELECT_DEVICE":
      return Object.assign({}, state, action.selectDevice);

    case "UNSELECT_DEVICE":
      return Object.assign({}, state, action.unselectDevice);

    default:
      return state;
  }
}

module.exports = deviceScan;
