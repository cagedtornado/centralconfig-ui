import update from 'react-addons-update';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap-modal'

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class EditItemModal extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			configItem: props.configItem
	    };

	    //  Bind our events: 
    	this._onApplicationChange = this._onApplicationChange.bind(this);
    	this._onNameChange = this._onNameChange.bind(this);
    	this._onValueChange = this._onValueChange.bind(this);
    	this._onMachineChange = this._onMachineChange.bind(this);

    	this._handleKeyPress = this._handleKeyPress.bind(this);
    	this._saveItem = this._saveItem.bind(this);
	}

	render() {
		//	Return the app HTML to render		
		return (
			<Modal show={this.props.show} onHide={this.props.hide} aria-labelledby="ModalHeader">
				<Modal.Header closeButton>
					<Modal.Title id='ModalHeader'>Edit config item</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="form-group">
					<label htmlFor="txtNewAppName">Application</label>
					<input type="text" className="form-control" id="txtNewAppName" autoFocus value={this.state.configItem.application} onChange={this._onApplicationChange} onKeyPress={this._handleKeyPress} placeholder="Your application name"/>
					</div>
					<div className="form-group">
					<label htmlFor="txtNewName">Name</label>
					<input type="text" className="form-control" id="txtNewName" value={this.state.configItem.name} onChange={this._onNameChange} onKeyPress={this._handleKeyPress} placeholder="Config item name"/>
					</div>
					<div className="form-group">
					<label htmlFor="txtNewValue">Value</label>
					<input type="text" className="form-control" id="txtNewValue" value={this.state.configItem.value} onChange={this._onValueChange} onKeyPress={this._handleKeyPress} placeholder="Config value"/>
					</div>
					<div className="form-group">
					<label htmlFor="txtNewMachine">Machine</label>
					<input type="text" className="form-control" id="txtNewMachine" value={this.state.configItem.machine} onChange={this._onMachineChange} onKeyPress={this._handleKeyPress} placeholder="Optional machine name"/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
					<button className='btn btn-primary' type='button' onClick={this._saveItem}>
					Save
					</button>
				</Modal.Footer>
			</Modal>
		);
	}

	_handleKeyPress(event){
		if(event.which == 13){
			this._saveItem(event);
		}
	}

	_onApplicationChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      configItem: {application: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_onNameChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      configItem: {name: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_onValueChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      configItem: {value: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_onMachineChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      configItem: {machine: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_saveItem(event){
		//	Validate inputs

		//	Set the item and get all items:
		CentralConfigAPIUtils.setConfigItem(this.state.configItem).then(CentralConfigAPIUtils.getAllConfigItems);

		//	Hide the dialog:
		this.props.hide();
	}

}

export default EditItemModal