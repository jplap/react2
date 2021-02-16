import React, {Component} from 'react';

import sessionFactorySource from "./repositoryFocus/sessionFactorySource";
import { Modal} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
//import Chip from '@material-ui/core/Chip';

import {TextareaAutosize} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
//import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import Grid from "@material-ui/core/Grid";

import "./BlockCreation.css";

const styles1 = theme => ({
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

class BlockCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataName: "",
            dataCategory: "",

            childRefCategory: React.createRef(),
            visible: props.activate,

            show: false,
            radioGroupRef: null

        };
        //this.props.onRegisterBlkCreation(this);


        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);


        //this.handleShow = this.handleShow.bind(this);
        this.getCategory = this.getCategory.bind(this);

        //this.handleEntering = this.handleEntering.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);

        this.onAddBlock = this.onAddBlock.bind(this);


    }

    handleClose() {

        this.setState({show: false})
    }

    handleSave() {
        this.handleClose();

        let newId = sessionFactorySource.get().generateGuid();
        if (newId && this.state.dataName && this.state.dataCategory) {
            let newBlock = {id: newId, name: this.state.dataName, category: this.state.dataCategory};
            sessionFactorySource.get().addBlock(newBlock);
            this.props.onBlkIsCreated();


        } else {
            alert("create a new block failed type:" + this.state.dataCategory + " content: " + this.state.dataName)


        }
    }


    handleCancel() {

    }

    handleOk() {

    }

    handleChangeCategory(event) {
        this.setState({dataCategory: event.target.value});
    }

    getCategory() {
        return this.state.dataCategory;
    }

    handleChangeData(event) {
        this.setState({dataName: event.target.value})
    }

    getName() {
        return this.state.dataName;
    }


    activateCreationPanel() {
        this.setState({visible: true}, () => {
            this.forceUpdate();
        })
    }

    onAddBlock() {
        this.setState({show: true}, () => {
            this.forceUpdate();
        })
    }


    render() {
        const {classes} = this.props;
        let items = []

        //items.push(<button className="bt-action" onClick={this.onAddBlock}> Add Block</button>)
        //items.push(<Chip className={classes.chip} color="primary" label="Create" onClick={this.onAddBlock}/>)
        items.push(    <IconButton aria-label="create" data-backdrop="false" className={classes.margin} onClick={this.onAddBlock} color="primary" fontSize="large">
            <AddBoxSharpIcon />add block
            </IconButton>);
        //items.push(<Button className={classes.buttoncmd} color="primary" variant="contained" label="Create" onClick={this.onAddBlock}>Create</Button>)
        if (this.state.visible === true) {
            this.option = sessionFactorySource.get().getBlockCategoriesRef();
            items.push(
                <Grid id="iContainerModal"  item xs={12} lg={12}  >
                                    <Modal show={this.state.show} onHide={this.handleClose} animation={false} data-backdrop="false"     >
                    <Modal.Header closeButton>
                        <Modal.Title>Block Creation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <RadioGroup
                            ref={this.state.radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={this.state.dataCategory}
                            onChange={this.handleChangeCategory}
                        >
                            {this.option.map((option) => (
                                <FormControlLabel value={option} key={option} control={<Radio/>} label={option}/>
                            ))}

                        </RadioGroup>
                        <TextareaAutosize placeholder="Add a block Name" onChange={this.handleChangeData}></TextareaAutosize>


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

                    </Grid>
            )
        }

        return (
            items
        );

    }
}

export default withStyles(styles1, {withTheme: true}) (BlockCreation);

