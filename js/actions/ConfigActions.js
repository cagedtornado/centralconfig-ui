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

	//	Filter the config data
	filterConfigData(appName) {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_APPFILTER,
		  appFilter: appName
		});

	}

	//	An item has been added or updated
	recieveUpdatedConfigData(configData) {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_UPDATED_CONFIGITEM,
		  configItem: configData
		});

	}

	//	An item has been removed
	recieveRemovedConfigData(configData) {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.RECIEVE_REMOVED_CONFIGITEM,
		  removedItem: configData
		});

	}

	//	We don't have an item to remove
	clearRemovedConfigData() {

		AppDispatcher.dispatch({
		  actionType: CentralConfigConstants.CLEAR_REMOVED_CONFIGITEM
		});

	}

}

export default new ConfigActions();