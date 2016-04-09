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

  getApplications() {
    let applications = [];

    //  Cycle through and get the list of applications:
    applications = this.configitems.map(function(item) { return item.application; });
    applications = applications.filter(function(v,i) { return applications.indexOf(v) == i; });

    return applications;
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