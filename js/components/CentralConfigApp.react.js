import {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

//	The stores
import ConfigStore from '../stores/ConfigStore';

class CentralConfigApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
	    this.state = {
	      configItems: ConfigStore.getConfigItems()
	    };

	    //  Bind our events:
    	this._onChange = this._onChange.bind(this);

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


		//	Return the app HTML to render		
		return (
			
			<Table
			rowsCount={this.state.configItems.length}
			rowHeight={40}
			headerHeight={40}
			width={800}
			height={400}>

			<Column
			header={<Cell>Name</Cell>}
			cell={props => (
				<Cell {...props}>
				{this.state.configItems[props.rowIndex].name}
				</Cell>
				)}
			width={200}
			/>
			</Table>

			);
	}

	_onChange() {
    	this.setState({
	      configItems: ConfigStore.getConfigItems()
	    });
  	}

}

export default CentralConfigApp;