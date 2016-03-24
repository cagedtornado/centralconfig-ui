import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';

class ConfigActions {

  recieveConfigData(configData) {

    AppDispatcher.dispatch({
      actionType: CentralConfigConstants.RECIEVE_RAW_CONFIGITEMS,
      configData: configData
    });

  }

}

export default new ConfigActions();