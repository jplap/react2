import React, {Component} from 'react';

import sessionFactorySource from "./repositoryFocus/sessionFactorySource";
import { Modal} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import RadioGroup from "@material-ui/core/RadioGroup";
import  FormControlLabel from "@material-ui/core/FormControlLabel";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import Radio from "@material-ui/core/Radio";
//import DragAndDrop from "./DragAndDrop"
import './Dropzone.css';

import IconButton from "@material-ui/core/IconButton";



import Dropzone from "./Dropzone"

import {TextareaAutosize} from "@material-ui/core";
//import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    buttoncmd:{
        margin: theme.spacing(1)
    },

})




class BlockPartCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataValue: "",
            dataType: "",


            childRefDropZone: React.createRef(),

            visible: props.activate,

            show: false,
            radioGroupRef: null,

            files: [
                'nice.pdf',
                'verycool.jpg',
                'amazing.png',
                'goodstuff.mp3',
                'thankyou.doc'
            ]

        };
        //this.props.onRegisterBlkPartCreation(this);


        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);


        //this.handleShow = this.handleShow.bind(this);
        this.getCategory = this.getCategory.bind(this);

        //this.handleEntering = this.handleEntering.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handlePartDrop = this.handlePartDrop.bind(this);
        this.onHandleDropResult = this.onHandleDropResult.bind(this);




        this.onAddPart = this.onAddPart.bind(this);


    }

    handleClose() {

        this.setState({show: false})
    }
    setIdBlock( idBlock){
        this.setState({idBlock: idBlock})
    }

    handleSave() {
        this.handleClose();

        if ( this.state.dataValue && this.state.dataType) {

            let newPart = {type: this.state.dataType, data: this.state.dataValue};

            sessionFactorySource.get().addPart(this.state.idBlock, newPart);
            this.props.onBlkPartIsCreated(this.state.idBlock);
        }else{
            alert("create a new Part failed type:" + this.state.dataType + " content: " + this.state.dataValue)
        }




    }


    handleCancel() {

    }

    handleOk() {

    }

    handleChangeCategory(event) {
        this.setState({dataType: event.target.value});
    }

    getCategory() {
        return this.state.dataType;
    }

    handleChangeData(event) {
        this.setState({dataValue: event.target.value})
    }

    getName() {
        return this.state.dataValue;
    }


    activateCreationPanel() {
        this.setState({visible: true}, () => {
            this.forceUpdate();
        })
    }

    onAddPart() {
        this.setState({show: true}, () => {
            this.forceUpdate();
        })
    }

    handlePartDrop(){
        console.log ("handlePartDrop")

    }
    onHandleDropResult( data ){
        console.log("onHandleDropResult data:" + data );
        if (data && data.type.startsWith("image/")) {
            this.setState({dataValue: data.data, dataType: "image"})
        }else if (data && data.type.startsWith("application/json")){
            this.setState({dataValue: data.data, dataType: "json"})
        }else{
            alert("data type unknow:" + data.type.startsWith )
        }

    }


    render() {

        let items = []
        const {classes} = this.props;
        //items.push(<button className="bt-action" onClick={this.onAddPart}> Add Part</button>)
        //items.push(<Button className={classes.buttoncmd} variant="contained" color="primary"   onClick={this.onAddPart}>Create</Button>)
        items.push(    <IconButton aria-label="create" className={classes.margin} onClick={this.onAddPart} color="primary" fontSize="large">
            <AddBoxSharpIcon />add part
        </IconButton>);
        if (this.state.visible === true) {
            this.option = sessionFactorySource.get().getPartTypesRef();
            items.push(
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Part Creation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <RadioGroup
                            ref={this.state.radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={this.state.dataType}
                            onChange={this.handleChangeCategory}
                        >
                            {this.option.map((option) => (
                                <FormControlLabel value={option} key={option} control={<Radio/>} label={option}/>
                            ))}

                        </RadioGroup>

                        <TextareaAutosize placeholder="Add Data" onChange={this.handleChangeData}/>
                        <div className="content">
                            <Dropzone onHandleDropResult={this.onHandleDropResult}  ref={this.state.childRefDropZone}/>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        return (
            items
        );

    }
}


export default withStyles(styles, {withTheme: true}) (BlockPartCreation);

