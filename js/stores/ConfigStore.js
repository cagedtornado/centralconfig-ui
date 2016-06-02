import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';
import Immutable from 'immutable';

class ConfigStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    //  Use immutable to create a map of config items:
    this.configitems = Immutable.Map();
  }

  getConfigItems() {
    //  Return the array of config items:
    return this.configitems.toArray();
  }

  getApplications() {
    //  Temporary array of applications
    let applications = [];

    //  Cycle through and get the list of applications:
    applications = this.configitems.toArray().map(function(item) { return item.application; });
    applications = applications.filter(function(v,i) { return applications.indexOf(v) == i; });

    //  Return what we found:
    return applications;
  }

  __onDispatch(action) {

    switch(action.actionType) {

      case CentralConfigConstants.RECIEVE_RAW_CONFIGITEMS:
        //  Raw update -- set all config items:
        let newConfigItems = this.configitems.clear();
        console.log('Updating config store: ', action);

        //  For each config item, create an item in the map:
        action.configData.map(function(configItem){            
            newConfigItems = newConfigItems.set(configItem.id, configItem);
        })
        this.configitems = newConfigItems;

        //  Indicate there was a change:
        this.__emitChange();
        break;

      case CentralConfigConstants.RECIEVE_UPDATED_CONFIGITEM:
        //  Update the config item specified:
        let updatedConfigItems = this.configitems.set(action.configItem.id, action.configItem);
        this.configitems = updatedConfigItems;

        //  Indicate there was a change:
        this.__emitChange();
        break;        
      
      case CentralConfigConstants.RECIEVE_REMOVED_CONFIGITEM:
        //  Update the config item specified:
        let reducedConfigItems = this.configitems.delete(action.removedItem.id);
        this.configitems = reducedConfigItems;

        //  Indicate there was a change:
        this.__emitChange();
        break;        

      default:
        // no op
      }
    }

  }

  module.exports = new ConfigStore(AppDispatcher);