import {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap-modal'

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class AddItemModal extends Component {

	render() {

		//	Return the app HTML to render		
		return (
			<Modal 
		          show={this.props.show} 
		          onHide={this.props.onHide}
		          aria-labelledby="ModalHeader"
		        >
		          <Modal.Header closeButton>
		            <Modal.Title id='ModalHeader'>Add a new config item</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	
					  <div className="form-group">
					    <label htmlFor="txtNewAppName">Application</label>
					    <input className="form-control" id="txtNewAppName" placeholder="Your application name" autoFocus/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewName">Name</label>
					    <input className="form-control" id="txtNewName" placeholder="Config item name"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewValue">Value</label>
					    <input className="form-control" id="txtNewValue" placeholder="Config value"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewMachine">Machine</label>
					    <input className="form-control" id="txtNewMachine" placeholder="Optional machine name"/>
					  </div>

		          </Modal.Body>
		          <Modal.Footer>
		            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
		            <button className='btn btn-primary' type='submit' onClick={this.props.onSave}>
		              Save
		            </button>
		          </Modal.Footer>
		        </Modal>
		        );
	}

}

export default AddItemModal