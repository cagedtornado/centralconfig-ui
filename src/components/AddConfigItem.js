//  React
import React, { Component } from 'react';

import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';

class AddConfigItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a new config item</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="txtApplication">App name</label>
              <input type="text" className="form-control" id="txtApplication" placeholder="Name of your application"/>
              <small id="txtApplicationHelp" class="form-text text-muted">You can group configuration by the application that uses it.  Select * to set this for all applications</small>              
            </div>
            <div className="form-group">
              <label htmlFor="txtNewName">Name</label>
              <input type="text" className="form-control" id="txtNewName" placeholder="Config item name"/>
            </div>
            <div className="form-group">
              <label htmlFor="txtNewValue">Value</label>
              <input type="text" className="form-control" id="txtNewValue" placeholder="Config value"/>
            </div>
            <div className="form-group">
              <label htmlFor="txtNewMachine">Machine</label>
              <input type="text" className="form-control" id="txtNewMachine" placeholder="Optional machine name"/>
            </div>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddConfigItem;