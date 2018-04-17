const initialState = {
    devices: [
      {
        key: 1,
        deviceName: 'name1',
        deviceConnect: false,
      },
      {
        key: 2,
        deviceName: 'name2',
        deviceConnect: true,
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
      switchIcon: '',
    }
}
 
import type { Action } from "../actions/types";

function deviceScan(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
 
  switch (action.type) {
    case "SELECT_DEVICE":
        console.log(action.selectDevice);

      return Object.assign({}, state, {
        devices: state.devices.map((device) => {
          if (device.key === action.selectDevice.key) {
            return Object.assign({}, device, {
              deviceConnect: !device.deviceConnect
            })
          } else {
            return Object.assign({}, device, {
              deviceConnect: false
            })
          }
          return device
        }),
        selectedDevice:{
          deviceName: action.selectDevice.deviceName,
          connectState: '已连接',
          switchIcon: 'switch',
        }
      });

    case "UNSELECT_DEVICE":
      return Object.assign({}, state, {
        selectedDevice: action.unselectDevice,
        devices: state.devices.map((device) => {
          if (device.deviceConnect) {
            return Object.assign({}, device, {
              deviceConnect: !device.deviceConnect
            })
          }
            return device
          })
      });

    default:
      return state;
  }
}

module.exports = deviceScan;
