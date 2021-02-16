import React, {Component} from 'react';
//import axios from 'axios';
import sessionFactorySource from "./repositoryFocus/sessionFactorySource";
import {AgGridReact} from 'ag-grid-react';

//import Grid from "@material-ui/core/Grid";
//import Grid from "ag-grid-community";
//import BlockCard from "./BlockCard";
//import BlockPartCreation from "./BlockPartCreation.js";
import BlockTags from "./BlockTags"
import BlockPartCreation from "./BlockPartCreation";

//https://reactjsexample.com/a-flexible-and-easy-to-use-chips-component-for-react/
import "ag-grid-community/dist/styles/ag-grid.css";
//import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './Block.css';
import {withStyles} from "@material-ui/core/styles";
import BtnCellRenderer from "./BtnCellRenderer";
import ReactDOM from "react-dom";
import AlertDialog from "./AlertDialog";
//import BlockCreation from "./BlockCreation";
import Grid from "@material-ui/core/Grid";
import './BlockContent.css';


//https://www.ag-grid.com/documentation/react/column-definitions/
//https://www.c-sharpcorner.com/article/how-to-use-ag-grid-in-reactjs/
const styles = theme => ({


    imgEditor: {
        height: "200px",
        borderRadius: "10px",
        backgroundColor: "#fdf5e6",


    },
})

class BlockContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            repoInstance: null,
            isLoading: false,
            error: null,

            childRefPart: React.createRef(),
            childRefCard: React.createRef(),
            childRefPartContent: React.createRef(),
            /*
                        columnDefs: [
                            {headerName: 'id', field: 'id', sortable: true, filter: true},
                            {headerName: 'name', field: 'name', sortable: true, filter: true},
                            {headerName: 'category', field: 'category', sortable: true, filter: true}

                        ],

             */
            rowData: [
                /*
                {id: 'Toyota', name: 'Celica', category: 35000},
                {id: 'Ford', name: 'Mondeo', category: 32000},
                {id: 'Porsche', name: 'Boxter', category: 72000}

                 */
            ],
            defaultColDefParts: {
                // set every column width
                //width: 500,
                // make every column editable
                editable: true,
                // make every column use 'text' filter by default
                filter: 'agTextColumnFilter',
                floatingFilter: true
            },
            columnDefsParts: [
                // {headerName: 'id', field: 'id', sortable: true, filter: true, checkboxSelection: true, editable:false },
                {headerName: 'type', field: 'type', sortable: true, filter: true, editable: false},
                {headerName: 'data', field: 'data', sortable: true, filter: true},
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
                },


            ],
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer
            },
            rowSelectionParts: 'multiple',

        };
        //this.props.onRegisterBlk (this);
        this.onGridReady = this.onGridReady.bind(this);
        this.onRemoveSelected = this.onRemoveSelected.bind(this);
        //this.onAddPart =  this.onAddPart.bind(this);
        //this.onCommit =  this.onCommit.bind(this);
        this.reload = this.reload.bind(this);
        this.onReloadPartCard = this.onReloadPartCard.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.onCellValueChanged = this.onCellValueChanged.bind(this);
        this.clickedRemove = this.clickedRemove.bind(this);
        this.onModalResult = this.onModalResult.bind(this);


        this.modalDialogRef = React.createRef();
        this.refBlkPartCreation = React.createRef();

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
            this.onRemoveSelected();
        }
    }

    onReloadPartCard(id) {
        let blockUIParts = [];
        this.setState({id: id});
        let block = this.state.repoInstance.getBlock(id);
        this.setState({
            rowData: [{
                id: block.id,
                name: block.name,
                category: block.category,
                childRefCard: React.createRef()
            }]
        })
        if (block && block.parts.length >= 1) {
            for (let i = 0; i < block.parts.length; i++) {
                blockUIParts.push({id: block.parts[i].id, type: block.parts[i].type, data: block.parts[i].data});
            }
            this.setState({parts: blockUIParts})

        }
        this.setState({forceall: true})

        this.forceUpdate()
    }

    reload(id) {
        //if (id == null ) return;
        let blockUIParts = [];
        if (id !== null) {

            this.setState({id: id, childRefCard: React.createRef()});
            let block = this.state.repoInstance.getBlock(id);
            if (block) {
                this.setState({rowData: [{id: block.id, name: block.name, category: block.category}]})
            }
            if (block && block.parts && block.parts.length >= 1) {
                for (let i = 0; i < block.parts.length; i++) {
                    blockUIParts.push({id: block.parts[i].id, type: block.parts[i].type, data: block.parts[i].data});
                }

                //this.setState({parts: blockUIParts, chipsSuggestions:this.state.repoInstance.getTagsRef(), chips:this.state.repoInstance.getTagsName(id) })


            }//else{
            // this.setState({parts: blockUIParts})
            // }
        } else {
            this.setState({rowData: null});
        }
        this.setState({
            parts: blockUIParts,
            chipsSuggestions: this.state.repoInstance.getTagsRef(),
            chips: this.state.repoInstance.getTagsName(id)
        })
        if ( this.refBlkPartCreation.current ) {
            this.refBlkPartCreation.current.setIdBlock(id)
        }
        this.setState({forceall: true})
        this.forceUpdate()
    }

    componentDidMount() {

        //let inst = sessionFactorySource.get();
        //this.inst = inst;

        this.setState({repoInstance: sessionFactorySource.get(), isLoading: true}, () => {
            if (this.props.id) {
                this.reload(this.props.id)
            }
        });

        //this.setState( {rowData: [...this.state.rowData,{id: 'Lexus', name: 'Boxter', category: 72000}]} )

        /*
        axios.get(API + DEFAULT_QUERY)
            .then(result => this.setState({
                data: result.data.hits,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

         */
    }

    changeRepoSource() {
        this.setState({repoInstance: sessionFactorySource.get(), isLoading: true}, () => {


            this.reload(this.state.id);

        });
/*
        let inst = sessionFactorySource.create({name: repo});
        this.inst = inst;

        this.setState({repoInstance: inst, isLoading: true}, () => {


            this.reload(this.state.id);

        });
*/
        /*
        sessionFactorySource.create({name: repo}).then((value) => {
            console.log(value);
            this.inst = value ;
            this.setState({repoInstance: this.inst, isLoading: true}, () => {
                this.reload(this.state.id);


            });
        }, (raison) => {
            // expected output: "Success!"
            alert("creation repository failed")
        });

         */

    }


    handleChangeTags(tags) {

        let res = this.state.repoInstance.setTagsNames(this.state.rowData[0].id, tags);
        if (res === false) {
            alert("set tags failed")
        }
        this.reload(this.state.rowData[0].id)
    }

    onRemoveSelected() {
        //https://www.ag-grid.com/documentation/react/row-selection/
        console.log("onRemoveSelected");
        if (this.gridApi) {
            let partsSelected = this.gridApi.getSelectedRows()

            for (let i = 0; i < partsSelected.length; i++) {

                this.state.repoInstance.removePart(this.state.rowData[0].id, partsSelected[i].id)

            }
        }
        this.reload(this.state.rowData[0].id)
        //var selectedRowData = gridOptions.api.getSelectedRows();
        //gridOptions.api.applyTransaction({ remove: selectedRowData });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit()
    }

    onRowSelected(e) {

        console.log("onRowSelected")
        if (e && e.data.type === "json" && e.data.data) {

            let obj = JSON.parse(e.data.data);
            //document.getElementById("myPartEditor").innerHTML = "<textarea   cols=50 rows=10 class='myPartEditorTxtClass' id='myPartEditor1' />";
            document.getElementById("myPartEditorTxtId").value = JSON.stringify(obj, undefined, 4);
        } else if (e && e.data.type === "text" && e.data.data) {
            document.getElementById("myPartEditorTxtId").value = e.data.data;
        } else if (e && e.data.type === "image" && e.data.data) {
            const elements = document.getElementsByClassName("imgEditorClass");
            while (elements.length > 0) elements[0].remove();

            let img = new Image();
            img.src = e.data.data;
            img.className = "imgEditorClass";
            document.getElementById("myPartEditorArea2").appendChild(img);

        } else if (e && e.data.type === "url" && e.data.data) {
            //window.open(e.data.data);
        } else {
            //document.getElementById("myPartEditorArea").appendChild(img);
        }

    }

    onCellValueChanged(e) {
        console.log("onCellValueChanged: " + e)

        let resp = this.state.repoInstance.updatePart(this.state.rowData[0].id, e.data);
        if (resp === false) {
            alert("data update impossible:" + e)
        }
    }

    render() {
        const {classes} = this.props;
        //https://blog.ag-grid.com/react-get-started-with-react-grid-in-5-minutes/
        let operations = [];
        /*<BlockPartCreation handleOnAddPart={this.onAddPart}   ref={this.state.childRefPart}></BlockPartCreation>
            &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="bt-action" onClick={this.onAddPart}> Add Part </button>


         */
        /*
        operations.push( <div className = "row" >

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button   className="bt-action" onClick={this.onRemoveSelected}> Remove Selected </button>
            &nbsp;&nbsp;



        </div>);
*/
        let partsTitle = [];
        let parts = [];
        let partViewer = [];

        //if ( this.state.data[this.state.id] && this.state.data[this.state.id].category) {

        if (this.state.parts && this.state.forceall === true) {

            operations.push(<BlockPartCreation  activate={true} ref={this.refBlkPartCreation} onBlkPartIsCreated={this.props.onBlkPartIsCreated} key={1121} />)

            partViewer.push(<>
                <Grid id={"myPartEditorArea1"} item xs={6} lg={6}>
                    <textarea  className="myPartEditorTxtClass" id="myPartEditorTxtId"/>
                </Grid>
                <Grid id={"myPartEditorArea2"} item xs={6} lg={6}>

                </Grid>
                </>
             );


            partsTitle.push(<h2>Parts</h2>);
            //parts.push(operations);
            parts.push(
                <div className="row">

                    <div className="col-md-12">
                        {operations}

                        <div className="ag-theme-alpine">
                            <AgGridReact
                                pagination="true"
                                domLayout='autoHeight'
                                ref={this.state.childRefPartContent}
                                columnDefs={this.state.columnDefsParts}
                                defaultColDef={this.state.defaultColDefParts}
                                rowMultiSelectWithClick={true}
                                onGridReady={this.onGridReady}
                                onCellValueChanged={this.onCellValueChanged}
                                rowSelection={this.state.rowSelectionParts}
                                onRowSelected={this.onRowSelected.bind(this)}
                                rowData={this.state.parts} paginationPageSize="5"
                                frameworkComponents={this.state.frameworkComponents}
                              >

                            </AgGridReact>


                        </div>


                    </div>
                </div>
            )


        }

        //let blockCard = [];
        let blockTags = [];


        if (this.state.rowData && this.state.rowData.length > 0) {

            // let imgCategory = this.state.repoInstance.getBlockCategoriesImgRef(this.state.rowData[0].category);
            // blockCard.push(
            //     <Grid>
            //         <BlockCard /*onReloadPartCard={this.onReloadPartCard}*/ ref={this.state.childRefCard}
            //                    imagename={imgCategory} name={this.state.rowData[0].name}
            //                    category={this.state.rowData[0].category} id={this.state.rowData[0].id}/>
            //     </Grid>)

            blockTags.push(<BlockTags chipsSuggestions={this.state.chipsSuggestions} chips={this.state.chips}
                                      handleChangeTags={this.handleChangeTags}/>);
        }


        return (
            <>
                <Grid className="container">

                        {partsTitle}

                    <Grid container item xs={12} spacing={1} >

                        <Grid item xs={12} lg={9} >


                            {parts}


                        </Grid>
                        <Grid container item xs={12} spacing={3} >
                            {partViewer}
                        </Grid>



                    </Grid>
                    <Grid container item xs={12} spacing={2} >
                        <Grid item xs={12} lg={12} >
                            {blockTags}
                        </Grid>
                    </Grid>
                </Grid>


            </>


        );
    }


}

export default withStyles(styles, {withTheme: true})(BlockContent);

/*
<div className="row" style={{marginTop:"10px"}}>
                    <div className="col-sm-12 btn btn-info">
                        BlockContent Content
                    </div>
                </div>
                <div>
                    {blockCard}
                </div>





                   {parts}
 */