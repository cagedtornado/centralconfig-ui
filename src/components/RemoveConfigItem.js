//  React
import React, { Component } from 'react';

//  Utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class RemoveConfigItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            id: props.item.id,
            app: props.item.application,
            name: props.item.name,
            value: props.item.value,
            machine: props.item.machine
        };
    }

    render() {
        return (
            <button className="btn btn-sm btn-outline-danger" onClick={this._removeClick}>{this.props.buttonLabel}</button>
        );
    }

    _removeClick = () => {
        //  Create out object to update:
        let param = {
            id: this.state.id,
            application: this.state.app,
            name: this.state.name,
            value: this.state.value,
            machine: this.state.machine
        };

        //	Remove the item, then refresh the data:
        let APIUtils = new CentralConfigAPIUtils();
        APIUtils.removeConfigItem(param).then(() => APIUtils.getAllConfigItems());
    }

}

export default RemoveConfigItem;