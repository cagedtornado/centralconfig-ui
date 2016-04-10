import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

//  Grid component
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

class ConfigItemsGrid extends Component {

	constructor(props){

		super(props);
	}

	render() {

		let dataList = this.props.configItems;
		let appfilter = this.props.appfilter;
		//	If we have an application filter, only display 
		//	the items for the specified application (or global):
		if(appfilter != ""){
			dataList = dataList.filter(function(v) { return v.application == appfilter || v.application == "*"; });
		}

		//	Return the app HTML to render		
		return (
			<div className="configGrid">
					<Table
			        rowsCount={dataList.length}
			        rowHeight={40}
			        headerHeight={40}
			        width={this.props.containerWidth}
			        height={400}
			        {...this.props}>
			        <Column
			          header={<Cell>Application</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {dataList[props.rowIndex].application}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Name</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {dataList[props.rowIndex].name}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Value</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {dataList[props.rowIndex].value}
			            </Cell>
			          )}
			          flexGrow={2}
			          width={200}
			        />
			        <Column
			          header={<Cell>Machine</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {dataList[props.rowIndex].machine}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Last updated</Cell>}
			          cell={props => (
			            <Cell {...props}>
			            	{moment(dataList[props.rowIndex].updated).format('MMM-D h:mm a')}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Actions</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              <button onClick={()=>this.props.showEditConfigItem(dataList[props.rowIndex])}>Edit</button>&nbsp;
			              <button onClick={()=>this.props.handleRemove(dataList[props.rowIndex])}>Remove</button>
			            </Cell>
			          )}
			          width={150}
			        />
			      </Table>
				</div>
			);
	}

}

export default ConfigItemsGrid