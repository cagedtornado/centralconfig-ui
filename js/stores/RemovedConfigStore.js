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

        //  The removed item should include all fields except the original id:
        this.removedItem = JSON.parse(JSON.stringify(action.removedItem)); // Make a deep copy
        delete this.removedItem.id; // Remove the 'id' property

        this.__emitChange();
        break;

      case CentralConfigConstants.CLEAR_REMOVED_CONFIGITEM:
        console.log('Clearing removed config store: ', action);
        this.removedItem = null;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }
}

module.exports = new RemovedConfigStore(AppDispatcher);