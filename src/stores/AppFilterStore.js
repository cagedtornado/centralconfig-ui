import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../actions/ActionTypes';

class AppFilterStore extends Store {

  constructor(){
    super(AppDispatcher);

    //  Default to no filter
    this.appFilter = "";
  }

  getAppFilter() {
    return this.appFilter;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case CentralConfigConstants.RECIEVE_APPFILTER:      
        console.log('Updating appfilter store.  New filter: ' + action.appFilter);
        this.appFilter = action.appFilter;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

export default new AppFilterStore();