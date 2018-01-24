//  React
import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,

  Row,
  Col
} from 'reactstrap';

import Autocomplete from 'react-autocomplete';

import classnames from 'classnames';

//  Utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class AddConfigItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      app: "",
      name: "",
      value: "",
      machine: "",
      activeTab: '1'
    };

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  selectTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
              <Autocomplete
                getItemValue={(item) => item}
                items={this.props.applications}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item}
                  </div>
                }
                inputProps={{ className: 'form-control' }}
                value={this.state.app}
                onChange={this._onAppChange}
                onSelect={(val) => this.setState({ app: val })}
                wrapperStyle={{}}
                wrapperProps={{ id: "acApplication" }}
              />
              <small id="txtApplicationHelp" class="form-text text-muted">You can group configuration by the application that uses it.  Select * to set this for all applications</small>
            </div>

            <div className="form-group">
              <label htmlFor="txtNewName">Name</label>
              <input type="text" className="form-control" id="txtNewName" placeholder="Config item or feature flag name" value={this.state.name} onChange={this._onNameChange} />
            </div>

            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.selectTab('1'); }} >
                  Config item
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.selectTab('2'); }} >
                  Feature flag
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label htmlFor="txtNewValue">Value</label>
                      <input type="text" className="form-control" id="txtNewValue" placeholder="Config value" value={this.state.value} onChange={this._onValueChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtNewMachine">Machine</label>
                      <input type="text" className="form-control" id="txtNewMachine" placeholder="Optional machine name" value={this.state.machine} onChange={this._onMachineChange} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <form>

                      <div className="form-group row" style={{ marginTop: '10px' }}>
                        <label for="selectEnabled" className="col-sm-4 col-form-label">Enable / disable:</label>
                        <div className="col-sm-8">
                          <select className="form-control" id="selectEnabled" onChange={this._onFeatureEnabledChange} >
                            <option selected value="userules">Use rules below (default)</option>
                            <option value="true">Enabled for everybody</option>
                            <option value="false">Disabled for everybody</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFUsers" className="col-sm-3 col-form-label">Users</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFUsers" placeholder="List of users to enable the feature for" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFGroups" className="col-sm-3 col-form-label">Groups</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFGroups" placeholder="List of groups to enable the feature for" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFPercentLoggedIn" className="col-sm-4 col-form-label">Percent logged in</label>
                        <div className="col-sm-8">
                        <input type="number" min="0" max="100" className="form-control" id="txtFFPercentLoggedIn" placeholder="Enable for % of logged in users" />
                        </div>
                      </div>
                    </form>

                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkAdmin" />
                      <label className="form-check-label" for="chkAdmin">Enable for Admin users</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkInternal" />
                      <label className="form-check-label" for="chkInternal">Enable for Internal users</label>
                    </div>

                  </Col>
                </Row>
              </TabPane>
            </TabContent>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._onSave}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  _onAppChange = (e) => {
    this.setState({
      app: e.target.value
    });
  }

  _onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  _onValueChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  _onMachineChange = (e) => {
    this.setState({
      machine: e.target.value
    });
  }

  _onFeatureEnabledChange = (e) => {
    //  First, see if the current value can be parsed as JSON
    let value = {}
    try {
      //  If it can, use that object.  If it can't, use a new object
      value = JSON.parse(this.state.value);
    } catch (error) {
      console.log("Current config value doesn't appear to be a feature flag: Overwriting.");
    }

    //  Set the 'enabled' attribute
    value.enabled = e.target.value;

    //  Serialize to JSON
    let serializedValue = JSON.stringify(value);

    //  Save to value
    this.setState({
      value: serializedValue
    });
  }

  _onSave = (e) => {
    //  Create the object to add:
    let param = {
      application: this.state.app,
      name: this.state.name,
      value: this.state.value,
      machine: this.state.machine
    };

    //  Add the item and get all items:
    let APIUtils = new CentralConfigAPIUtils();
    APIUtils.setConfigItem(param).then(() => APIUtils.getAllConfigItems());

    //  Hide the dialog:
    this.setState({
      modal: false
    });
  }
}

export default AddConfigItem;