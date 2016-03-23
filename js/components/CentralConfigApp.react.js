import {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

//	The stores



class CentralConfigApp extends Component {

	constructor(props){

		super(props);

		this.state = {
			myTableData: [
			{name: 'Rylan'},
			{name: 'Amelia'},
			{name: 'Estevan'},
			{name: 'Florence'},
			{name: 'Tressa'},
			],
		};
	}

	render() {


		//	Return the app HTML to render		
		return (
			
			<Table
			rowsCount={this.state.myTableData.length}
			rowHeight={40}
			headerHeight={40}
			width={800}
			height={400}>

			<Column
			header={<Cell>Name</Cell>}
			cell={props => (
				<Cell {...props}>
				{this.state.myTableData[props.rowIndex].name}
				</Cell>
				)}
			width={200}
			/>
			</Table>

			);
	}

}

export default CentralConfigApp;