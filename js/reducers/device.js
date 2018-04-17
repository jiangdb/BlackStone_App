const initialState = {
    devices: [
      {
        key: 1,
        deviceName: 'name1',
      },
      {
        key: 2,
        deviceName: 'name2',
      },
      {
        key: 3,
        deviceName: 'name3',
      }
    ],
    selectedDevice: {
      deviceKey: null,
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
        devices:state.devices.filter((device) => device.key !== action.selectDevice.key),
        selectedDevice:{
          deviceKey: action.selectDevice.key,
          deviceName: action.selectDevice.deviceName,
          connectState: '已连接',
          switchIcon: 'switch',
        }
      });

    case "UNSELECT_DEVICE":
      return Object.assign({}, state, {
        devices: [
          ...state.devices,
          {
            key: action.unselectDevice.selectedDevicekey,
            deviceName: action.unselectDevice.selectedDeviceName,
          }
        ],
        selectedDevice: {
          deviceKey: null,
          deviceName: '',
          connectState: '未连接',
          switchIcon: '',
        },

      });

    default:
      return state;
  }
}

module.exports = deviceScan;
