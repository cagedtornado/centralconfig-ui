import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';

//  Simple single-item undo stack.
class RemovedConfigStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);

    this.removedItem = {};
  }

  getConfigItem() {
    return this.removedItem;
  }

  __onDispatch(action) {

    switch(action.actionType) {

      case CentralConfigConstants.RECIEVE_REMOVED_CONFIGITEM:
        console.log('Updating removed config store: ', action);
        this.removedItem = action.removedItem;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

module.exports = new RemovedConfigStore(AppDispatcher);