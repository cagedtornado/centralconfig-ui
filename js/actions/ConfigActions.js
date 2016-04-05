import AppDispatcher from '../dispatcher/AppDispatcher';
import CentralConfigConstants from '../constants/CentralConfigConstants';

class ConfigActions {

	//	Updates the 'config items' store
	recieveConfigData(configData) {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_RAW_CONFIGITEMS,
		  configData: configData
		});

	}

	//	Updates the 'removed item' store
	recieveRemovedConfigData(configData) {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_REMOVED_CONFIGITEM,
		  removedItem: configData
		});

	}

	//	Clears the 'removed item' store
	clearRemovedConfigData() {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_REMOVED_CONFIGITEM,
		  removedItem: null
		});

	}

}

export default new ConfigActions();