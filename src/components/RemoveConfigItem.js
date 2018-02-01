//  React
import React, { Component } from 'react';

//  Utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class RemoveConfigItem extends Component {

    render() {
        return (
            <button className="btn btn-sm btn-outline-danger" onClick={() => this._removeClick(this.props.item)}>{this.props.buttonLabel}</button>
        );
    }

    _removeClick = (item) => {
        //	Remove the item, then refresh the data:
        let APIUtils = new CentralConfigAPIUtils();
        APIUtils.removeConfigItem(item).then(() => APIUtils.getAllConfigItems());
    }

}

export default RemoveConfigItem;