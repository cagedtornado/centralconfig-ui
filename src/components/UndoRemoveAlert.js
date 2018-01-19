//  React
import React, { Component } from 'react';

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

//	Actions
import ConfigActions from '../actions/ConfigActions';

//	The stores
import RemovedConfigStore from '../stores/RemovedConfigStore';

class UndoRemoveAlert extends Component {

	constructor(props){
		super(props);

		//  Set initial state:
		this.state = {
			removedConfigItem: null
	    };
	}

	componentDidMount() {
	    //  Add store listeners ... and notify ME of changes
	    this.undoListener = RemovedConfigStore.addListener(this._onRemoveUpdate);
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.undoListener.remove();
	}

	render() {

		//	If we don't have a removed item, don't show the alert
		if(this.state.removedConfigItem === null || this.state.removedConfigItem === undefined)
		{
			return null;
		}

		return (
			<div className="alert alert-info" role="alert">
				<button type="button" className="close" aria-label="Close" onClick={this._onClearUndo}><span aria-hidden="true">&times;</span></button>
				Config item <b>{this.state.removedConfigItem.application} / {this.state.removedConfigItem.name}</b> removed - <a className="btn btn-sm btn-outline-primary" onClick={this._undoRemoveClick}>UNDO</a>
			</div>
		);
	}

	_onClearUndo = () => {
		ConfigActions.clearRemovedConfigData();
	}

	_onRemoveUpdate = () => {		
	    this.setState({
	      removedConfigItem: RemovedConfigStore.getConfigItem()
	    });
  	}

	_undoRemoveClick = (event) => {
        //	Reset the item and get all items:
        let APIUtils = new CentralConfigAPIUtils();
        APIUtils.setConfigItem(this.state.removedConfigItem).then(() => APIUtils.getAllConfigItems());
	}

}

export default UndoRemoveAlert