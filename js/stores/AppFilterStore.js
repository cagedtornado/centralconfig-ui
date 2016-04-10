import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';

class AppFilterStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    //  Default to no filter
    this.appFilter = "";
  }

  getPage() {
    return this.currentPage;
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

module.exports = new AppFilterStore(AppDispatcher);