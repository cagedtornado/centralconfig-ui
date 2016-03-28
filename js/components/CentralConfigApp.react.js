import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dimensions from 'react-dimensions'

//  Grid component
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

//	The stores
import ConfigStore from '../stores/ConfigStore';

class CentralConfigApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			configItems: []
	    };

	    //  Bind our events: 
    	this._onChange = this._onChange.bind(this);
    	this.handleEdit = this.handleEdit.bind(this);

	}

	componentDidMount() {
	    //  Add store listeners ... and notify ME of changes
	    this.configListener = ConfigStore.addListener(this._onChange);
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.configListener.remove();
	}

	render() {
		if(this.state.configItems.length == 0){
			return null;
		}

		var {dataList} = this.state.configItems;

		//	Return the app HTML to render		
		return (
			<div>
				<Table
			        rowsCount={this.state.configItems.length}
			        rowHeight={40}
			        headerHeight={40}
			        width={this.props.containerWidth}
			        height={500}
			        {...this.props}>
			        <Column
			          header={<Cell>Id</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].id}
			            </Cell>
			          )}
			          fixed={true}
			          width={50}
			        />
			        <Column
			          header={<Cell>Application</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].application}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Name</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].name}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Value</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].value}
			            </Cell>
			          )}
			          flexGrow={2}
			          width={200}
			        />
			        <Column
			          header={<Cell>Machine</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].machine}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Last updated</Cell>}
			          cell={props => (
			            <Cell {...props}>
			            	{moment(this.state.configItems[props.rowIndex].updated).format('MMM-D h:mm a')}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Actions</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              <button>Edit</button>
			            </Cell>
			          )}
			          flexGrow={1}
			          width={100}
			        />
			      </Table>
			</div>
			);
	}

	_onChange() {
    	this.setState({
	      configItems: ConfigStore.getConfigItems()
	    });
  	}

  	handleEdit(e) {
  		console.log("In edit")
  		e.preventDefault();
  		console.log("Default prevented")
  		alert("C'mon son.  It's time to edit");
  	}

}

export default Dimensions()(CentralConfigApp) // Enhanced component