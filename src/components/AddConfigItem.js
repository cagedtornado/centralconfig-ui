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

//  Initial state:
const initialState = {
  /* Component state */
  modal: false,
  activeTab: '1',

  /* Config item */
  app: "",
  name: "",
  value: "", /* Might be a JSON encoded feature flag */
  machine: "",
  
  /* Feature flags */
  enabled: "userules",
  users: "",
  groups: "",
  percent_loggedin: "",
  variant_name: "",
  admin: false,
  internal: false
};

/* 
  Lifecycle:
  - Feature flags have their own state fields, but also update 'value' with serialized JSON
  - Cancel resets state
*/
class AddConfigItem extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

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
                          <select className="form-control" id="selectEnabled" value={this.state.enabled} onChange={this._onFeatureEnabledChange} >
                            <option selected value="userules">Use rules below (default)</option>
                            <option value="true">Enabled for everybody</option>
                            <option value="false">Disabled for everybody</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFUsers" className="col-sm-3 col-form-label">Users</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFUsers" value={this.state.users} onChange={this._onFeatureUsersChange} placeholder="Comma separated users to enable the feature for" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFGroups" className="col-sm-3 col-form-label">Groups</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFGroups" value={this.state.groups} onChange={this._onFeatureGroupsChange} placeholder="Comma separated groups to enable the feature for" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFPercentLoggedIn" className="col-sm-4 col-form-label">Percent logged in</label>
                        <div className="col-sm-8">
                          <input type="number" min="0" max="100" className="form-control" id="txtFFPercentLoggedIn" value={this.state.percent_loggedin} onChange={this._onFeaturePercentChange} placeholder="Enable for % of logged in users" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFVariant" className="col-sm-3 col-form-label">Variant</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFVariant" value={this.state.variant_name} onChange={this._onFeatureVariantChange} placeholder="Variant name to use" />
                        </div>
                      </div>
                    </form>

                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkAdmin" value={this.state.admin} onChange={this._onFeatureAdminChange} />
                      <label className="form-check-label" for="chkAdmin">Enable for Admin users</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkInternal" value={this.state.internal} onChange={this._onFeatureInternalChange} />
                      <label className="form-check-label" for="chkInternal">Enable for Internal users</label>
                    </div>

                  </Col>
                </Row>
              </TabPane>
            </TabContent>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._onSave}>Save</Button>{' '}
            <Button color="secondary" onClick={this._onCancel}>Cancel</Button>
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
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let enabled = e.target.value;

    if (enabled === "userules") {
      delete flag.enabled;
    } else {
      //  Set the 'enabled' attribute
      flag.enabled = enabled;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      enabled: enabled
    });
  }

  _onFeatureUsersChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  Parse users into an array
    let users = e.target.value.split(",").map(function (item) {
      //  Trim each user
      return item.trim();
    });

    //  Filter out blank users:
    users = users.filter(function (item) {
      let retval = false;

      if (item !== "") {
        retval = true;
      }

      return retval;
    });

    //  Now if we (still) have users, set the 'users' attribute
    //  Otherwise, just remove the attribute:
    if (users.length > 0) {
      flag.users = users;
    } else {
      delete flag.users;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      users: e.target.value
    });
  }

  _onFeatureGroupsChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  Parse groups into an array
    let groups = e.target.value.split(",").map(function (item) {
      //  Trim each user
      return item.trim();
    });

    //  Filter out blank groups:
    groups = groups.filter(function (item) {
      let retval = false;

      if (item !== "") {
        retval = true;
      }

      return retval;
    });

    //  Now if we (still) have groups, set the 'groups' attribute
    //  Otherwise, just remove the attribute:
    if (groups.length > 0) {
      flag.groups = groups;
    } else {
      delete flag.groups;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      groups: e.target.value
    });
  }

  _onFeaturePercentChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let percent = parseInt(e.target.value.trim(), 10);

    //  If we don't have a number, just remove the attribute:
    if (isNaN(percent)) {
      delete flag.percent_loggedin;
    } else {
      //  Set the 'percent_loggedin' attribute
      flag.percent_loggedin = percent;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      percent_loggedin: percent.toString()
    });
  }

  _onFeatureVariantChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let variant = e.target.value.trim();

    if (variant === "") {
      delete flag.variant_name;
    } else {
      //  Set the 'variant_name' attribute
      flag.variant_name = variant;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      variant_name: variant
    });
  }

  _onFeatureAdminChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  If 'admin' is true, set the attribute to true
    //  If it's false, just remove the attribute:
    if (e.target.checked === true) {
      flag.admin = true;
    } else {
      delete flag.admin;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      admin: e.target.checked
    });
  }

  _onFeatureInternalChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  If 'internal' is true, set the attribute to true
    //  If it's false, just remove the attribute:
    if (e.target.checked === true) {
      flag.internal = true;
    } else {
      delete flag.internal;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);

    //  Save the field state:
    this.setState({
      internal: e.target.checked
    });
  }

  //  Get the current feature flag object
  getCurrentFeatureFlag = (params) => {
    let value = {}

    let source = params || this.state.value;

    //  First, see if the current value can be parsed as JSON
    try {
      //  If it can, use that object.  If it can't, use a new object
      value = JSON.parse(source);
    } catch (error) {
      console.log("Current config value doesn't appear to be a feature flag: Overwriting.");
    }

    return value;
  }

  //  Save the current feature flag object
  saveCurrentFeatureFlag = (flag) => {
    //  Serialize to JSON
    let serializedFlag = JSON.stringify(flag);

    //  Save to the config item value
    this.setState({
      value: serializedFlag
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

    //  Reset the state
    this.setState(initialState);

    //  Hide the dialog:
    this.setState({
      modal: false
    });
  }

  _onCancel = (e) => {

    //  Reset the state
    this.setState(initialState);

    //  Hide the dialog:
    this.setState({
      modal: false
    });
  }
}

export default AddConfigItem;