export const webServerStateChange = info => ({
  type: 'WEB_SERVER_STATE_CHANGE',
  info
});

import fetch from 'cross-fetch';
import { validateWebToken, checkUpgrade } from '../services/webService.js'

export function webServerCheckUpgrade(model, version) {
  return function(dispatch) {
    validateWebToken(dispatch, checkUpgrade, model, version)
      .catch(err => console.log('webServerCheckUpgradeErr:' + err.message))
  }
}