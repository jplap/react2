import React, {Component} from 'react';
//import axios from 'axios';


import sessionFactorySource from "./repositoryFocus/sessionFactorySource";
import {AgGridReact} from 'ag-grid-react';

import ReactDOM from 'react-dom';


//import {Button} from 'react-bootstrap';

import "ag-grid-community/dist/styles/ag-grid.css";
//import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './Block.css';

import BtnCellRenderer from "./BtnCellRenderer";
import AlertDialog from "./AlertDialog";
import Grid from "@material-ui/core/Grid";
import BlockCard from "./BlockCard";
import BlockCreation from "./BlockCreation";
//import BlockTags from "./BlockTags";
//https://www.ag-grid.com/documentation/react/column-definitions/
//https://www.c-sharpcorner.com/article/how-to-use-ag-grid-in-reactjs/


class BlockList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enable: false,
            id: -1,
            repoSourceInstance: null,
            isLoading: false,
            error: null,


            childRefBlockContent: React.createRef(),
            childRefBlockForm: React.createRef(),

            columnDefs: [
                //{headerName: 'id', field: 'id', sortable: true, filter: true, editable:false},

                {headerName: 'name', field: 'name', sortable: true, filter: true, editable: true},
                {headerName: 'category', field: 'category', sortable: true, filter: true, editable: false},
                {
                    field: "Operation",
                    cellRenderer: "btnCellRenderer",
                    cellRendererParams: {
                        clicked: this.clickedRemove,
                        mycurrent: this
                        /*clicked: function(field) {
                            alert(`${field} was clicked`);
                        }*/
                    },
                    //minWidth: 50,
                    //width: 50,
                    sortable: false, filter: false, editable: false
                }


            ],
            rowData: [
                /*
                {id: 'Toyota', name: 'Celica', category: 35000},
                {id: 'Ford', name: 'Mondeo', category: 32000},
                {id: 'Porsche', name: 'Boxter', category: 72000}

                 */
            ],
            defaultColDef: {
                // set every column width
                //width: 500,
                // make every column editable
                //editable: true,
                // make every column use 'text' filter by default
                filter: 'agTextColumnFilter',
                floatingFilter: true
            },
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer
            },

            rowSelection: 'single',

        };


        //this.props.onRegisterBlkList(this);
        this.onGridReady = this.onGridReady.bind(this);
        //this.onRemoveSelected =  this.onRemoveSelected.bind(this);

        //this.onCommit = this.onCommit.bind(this);
        this.onExport = this.onExport.bind(this);


        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.deleteRowClicked = this.deleteRowClicked.bind(this);
        this.clickedRemove = this.clickedRemove.bind(this);
        this.onModalResult = this.onModalResult.bind(this);


        this.modalDialogRef = React.createRef();
        this.refBlkCreation = React.createRef();

    }

    clickedRemove(data) {
        this.mycurrent.setState({removeData: data})
        const div = document.createElement("div");
        document.body.appendChild(div);
        ReactDOM.render(<AlertDialog title={"Remove Block"} message={'Can you confirm Block deletion?'}
                                     ref={this.modalDialogRef} handleCaller={this.mycurrent.onModalResult}/>, div);

        //alert(`${field} was clicked!!`);

    }

    onModalResult(status) {
        console.log("onModalResult");
        if (status === true) {
            this.gridApi.currentRemoveId = this.state.removeData.id;
            this.gridApi.forEachNode(function (node) {
                node.setSelected(node.data.id === node.gridApi.currentRemoveId);
            });
            this.deleteRowClicked();
        }
    }

    onExport() {

        const jsonData = this.state.repoSourceInstance.getBlocks();

        /* const jsonData = {
             name: "Jonth",
             email: "jobtd@mail.com",
             website: "www.4codev.com"
         };*/

        function download(content, fileName, contentType) {
            const a = document.createElement("a");
            const file = new Blob([content], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }


        download(JSON.stringify(jsonData), "json-file-name.json", "text/plain");
    }

    reload() {
        let blocks = [];
        if (this.state.repoSourceInstance) {
            blocks = this.state.repoSourceInstance.getBlocks();
        }

        //var blocks = this.state.repoSourceInstance.getBlocks();
        let blkLst = [];
        for (let i = 0; i < blocks.length; i++) {
            blkLst.push({id: blocks[i].id, name: blocks[i].name, category: blocks[i].category})
        }
        this.setState({rowData: blkLst})



        this.forceUpdate()
    }

    changeRepoSource(repo) {

        this.setState({repoSourceInstance: sessionFactorySource.get({name: repo}), isLoading: true}, () => {
            this.setState({enable: true})

            this.reload();

        });



    }

    componentDidMount() {

    }




    /*
    onRemoveSelected(){
        //https://www.ag-grid.com/documentation/react/row-selection/
        console.log("onRemoveBlocSelected");
        if ( this.gridApi ) {
            var partsSelected = this.gridApi.getSelectedRows()
            for (var i = 0; i < partsSelected.length; i++) {

                this.state.repoSourceInstance.removePart(this.state.rowData[0].id, partsSelected[i].id)

            }
        }
        this.reload(this.state.rowData[0].id)
        //var selectedRowData = gridOptions.api.getSelectedRows();
        //gridOptions.api.applyTransaction({ remove: selectedRowData });
    }

     */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit()
    }

    onSelectionChanged(params) {
        console.log("onSelectionChanged")

        let selectedRows = params.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            this.setState({rowDataSelected: selectedRows})
            this.props.handleFetchBlk(selectedRows[0].id);
        }
    }

    deleteRowClicked() {
        //var selected = this.gridApi.getFocusedCell();
        //this.state.rowData.splice(selected.rowIndex, 1);
        //this.gridApi.setRowData(this.state.rowData);

        if (this.gridApi) {
            let blockSelected = this.gridApi.getSelectedRows();
            for (let i = 0; i < blockSelected.length; i++) {

                this.state.repoSourceInstance.removeBlock(blockSelected[i].id)

            }


            this.reload()
        }
    }

    render() {

        let blockTitle = [];
        let blockList = [];
        let operations = [];

        let blockCard = [];
        if (this.state.enable === true) {

            blockTitle.push(<h2>Block List</h2>)


            if (this.state.rowDataSelected) {
                let imgCategory;
                if (this.state.rowData[0] ) {
                    imgCategory = this.state.repoSourceInstance.getBlockCategoriesImgRef(this.state.rowData[0].category);

                blockCard.push(

                    <Grid>
                        <BlockCard onReloadPartCard={this.onReloadPartCard} imagename={imgCategory}
                                   name={this.state.rowDataSelected[0].name}
                                   category={this.state.rowDataSelected[0].category}
                                   id={this.state.rowDataSelected[0].id}/>
                    </Grid>
                )
                }
            }
            operations.push(<BlockCreation  activate={true} ref={this.refBlkCreation} onBlkIsCreated={this.props.onBlkIsCreated} key={1121} />)
            // On active le addBlock

            //blockList.push( <h2>Block List</h2>);

            blockList.push(
                <div className="row" style={{display: 'flex'}}>

                    <div className="col-md-12">
                        {operations}

                        <div className="ag-theme-alpine">
                            <AgGridReact
                                pagination="true"
                                domLayout='autoHeight'
                                ref={this.state.childRefBlockContent}
                                columnDefs={this.state.columnDefs}
                                defaultColDef={this.state.defaultColDef}
                                rowMultiSelectWithClick={true}
                                onGridReady={this.onGridReady}
                                rowSelection={this.state.rowSelection}
                                rowData={this.state.rowData} paginationPageSize="5"
                                onSelectionChanged={this.onSelectionChanged}
                                frameworkComponents={this.state.frameworkComponents}

                            >

                            </AgGridReact>


                        </div>


                    </div>
                </div>
            )


            /*
                     operations.push(<div className="row"><BlockCreation ref={this.state.childRefBlockForm}> </BlockCreation>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <button className="bt-action" onClick={this.onAddBlock}> Add Block</button>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <button className="bt-action" onClick={this.deleteRowClicked}> Remove Selected Block</button>
                         &nbsp;&nbsp;
                         <Button variant="primary" className="bt-action" onClick={this.onCommit}> Commit </Button>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <Button   className="bt-action" onClick={this.onexport}> Export </Button>


                         </div>
                     );
         */

        }

        return (
            <>
                <Grid className="container">
                    {blockTitle}
                    <Grid container item xs={12} spacing={1} >
                        <Grid item xs={12} lg={3} >
                            {blockCard}
                        </Grid>

                        <Grid item xs={12} lg={9} >
                            {blockList}
                        </Grid>

                    </Grid>
                </Grid>

            </>


        );
    }


}

export default BlockList;

