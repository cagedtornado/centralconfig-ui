import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';

class ConfigStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.configitems = [];
  }

  getConfigItems() {
    return this.configitems;
  }

  __onDispatch(action) {

    switch(action.actionType) {

      case CentralConfigConstants.RECIEVE_RAW_CONFIGITEMS:
      console.log('Updating config store: ', action);
      this.configitems = action.configData;
      this.__emitChange();
      break;

      default:
        // no op
      }
    }

  }

  module.exports = new ConfigStore(AppDispatcher);