import React from 'react';

import './Products.css';
import BlockContent from "./BlockContent";
import BlockList from "./BlockList";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import sessionFactorySource from "./repositoryFocus/sessionFactorySource";

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
//import BlockCreation from "./BlockCreation";
//import BlockPartCreation from "./BlockPartCreation";
import CircularProgress from '@material-ui/core/CircularProgress';

//import styled, { ThemeProvider } from 'styled-components';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import {withStyles} from "@material-ui/core/styles";

import '@szhsin/react-menu/dist/index.css';
import './Products.css';
//https://reactjsexample.com/a-customisable-and-optimised-react-menu-library-with-accessibility/
//https://szhsin.github.io/react-menu/

//https://material-ui.com/components/cards/
//https://material-ui.com/components/dividers/



import Chip from "@material-ui/core/Chip";

const styles = theme => ({



    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    formControlClicked: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: "green"

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },


    root: {

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
    command: {
        margin: theme.spacing(3, 1, 1),
        backgroundColor: "#fdf5e6",
        borderRadius: "10px"
    },
    info: {
        margin: theme.spacing(3, 1, 1),
        backgroundColor: "#b9edf0",
        borderRadius: "10px",


    },
    buttoncmd:{
        margin: theme.spacing(1)
    },
    fabProgress: {
        color: "blue" ,
        position: 'absolute',
        top: "50%",
        left: "50%",
        zIndex: 1,
    },



    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    dividerInset: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },

    imgEditor:{
        height:"200px",
        borderRadius: "10px",
        backgroundColor: "#fdf5e6",


    },
})

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
            source: "none",
            target: "none",
            targetLight: "danger",
            sourceLight: "danger",




        };

        this.handleFilter = this.handleFilter.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.handleFetchBlk = this.handleFetchBlk.bind(this);
        //this.onRegisterBlk = this.onRegisterBlk.bind(this);
        //this.onRegisterBlkList = this.onRegisterBlkList.bind(this);
        this.onSourceSelected = this.onSourceSelected.bind(this);
        this.onTargetSelected = this.onTargetSelected.bind(this);
        //this.onRegisterBlkCreation = this.onRegisterBlkCreation.bind(this);
        //this.onRegisterBlkPartCreation = this.onRegisterBlkPartCreation.bind(this);


        this.onBlkIsCreated = this.onBlkIsCreated.bind(this);
        this.onBlkPartIsCreated = this.onBlkPartIsCreated.bind(this);

        this.onDeleteBlockSelected = this.onDeleteBlockSelected.bind(this);
        this.onDeleteBlockPartSelected = this.onDeleteBlockPartSelected.bind(this);

        this.onCommit = this.onCommit.bind(this);
        this.onExport = this.onExport.bind(this);



        this.refBlklist = React.createRef();
        this.refBlkContent = React.createRef();
        this.refBlkCreation = React.createRef();
        this.refBlkPartCreation = React.createRef()
        this.refProgressBar = React.createRef()


    }

    componentDidMount() {
/*
        let data = {};
        if (sessionFactorySource.get()) {
            data = sessionFactorySource.get().getBlocks();
        }


        this.setState({products: data});
*/

    }

    handleFilter(filterInput) {
        this.setState(filterInput);
    }

    saveProduct(product) {
        if (!product.id) {
            product.id = new Date().getTime();
        }
        this.setState((prevState) => {
            let products = prevState.products;
            products[product.id] = product;
            return {products};
        });
    }

    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products;
            delete products[productId];
            return {products};
        });
    }

    handleFetchBlk(id) {
        this.setState({id: id});
        //this.state.blk.reload(id);
        this.refBlkContent.current.reload(id);
        //this.state.blkPartCreation.setIdBlock(id)
        //this.refBlkPartCreation.current.setIdBlock(id)


    }
/*
    onRegisterBlk(instance) {
        this.setState({blk: instance});
    }

 */
/*
    onRegisterBlkList(instance) {
        this.setState({blklist: instance});

    }
*/
    /*
    onRegisterBlkPartCreation(instance) {
        this.setState({blkPartCreation: instance}, () => {

        });

    }
/*
    onRegisterBlkCreation(instance) {
        this.setState({blkCreation: instance}, () => {

        });

    }
*/
    onBlkIsCreated() {
        //this.state.blklist.reload();
        this.refBlklist.current.reload();
    }

    onBlkPartIsCreated(id) {
        //this.state.blk.reload(id);
        this.refBlkContent.current.reload(id);


    }


    onSourceSelected(event) {
        let e = event.target.value;
        console.log("onSourceSelected: " + e);
        this.setState ({pbactivate: true}, () => {
            sessionFactorySource.create({name: e}).then((value) => {
                console.log(value);
                this.setState({source: e, target: e, sourceLight: "success", targetLight: "success", pbactivate: false})
                //this.state.blklist.changeRepoSource(e);
                this.refBlklist.current.changeRepoSource(e);
                //this.state.blk.changeRepoSource(e);
                this.refBlkContent.current.changeRepoSource(e);
                //this.state.blkCreation.activateCreationPanel();
                if ( this.refBlkCreation.current ) {
                    this.refBlkCreation.current.activateCreationPanel();
                }
                if ( this.refBlkPartCreation.current ) {
                    //this.state.blkPartCreation.activateCreationPanel();
                    this.refBlkPartCreation.current.activateCreationPanel();
                }




            }, (raison) => {
                // expected output: "Success!"
                this.setState({pbactivate: false}, () => {
                    alert("creation repository failed: " + raison );
                    //this.refProgressBar.current.performLinearAnimation(0, 0);
                    this.forceUpdate()
                })
            });
        })




    }

    onTargetSelected(event) {
        let e = event.target.value;
        console.log("onTargetSelected")
        this.setState({target: e, targetLight: "success"})


    }

    onDeleteBlockSelected(event) {
        //this.state.blklist.deleteRowClicked(event);
        this.refBlklist.current.deleteRowClicked(event);
        this.refBlkContent.current.reload(null);
    }

    onDeleteBlockPartSelected(event) {
        this.refBlkContent.current.onRemoveSelected(event);
    }
    onCommit() {
        /*
        if (this.props.target == null) {
            alert("no target defined");
            return;
        } else if (this.props.target === "file") {
            alert("commit impossible in " + this.props.target);
        }
        let inst = sessionFactorySource.get({name: this.props.target});
        if (inst == null) {

            alert("commit impossible. Repository Implementation of  " + this.props.target + " not exist");
            return;
        }
        */
        if ( this.state.target === null ){
            alert ("target no implemented")
        }else {

            sessionFactorySource.get().commit().then((value) => {

                alert("data Commited");
            }, function (erreur) {
                alert("data Not Commited. " + erreur);
            });
        }


    }
    onExport(){

        this.refBlklist.current.onExport();
    }


    render() {

        const tileData = [
            {

                img: "Logo-wordpress-bleu.png",
                title: 'Data Manager',
                author: 'troll',
                cols: 2

            },
        ]

        const {classes} = this.props;
        let classesSource = classes.formControl;
        if (this.state.source !== "none") {
            classesSource = classes.formControlClicked;
        }
        let classesTarget = classes.formControl;
        if (this.state.target !== "none") {
            classesTarget = classes.formControlClicked;
        }
        const progressBar = [];
        if (this.state.pbactivate === true) {

            progressBar.push(<div>
                    <CircularProgress size={100} className={classes.fabProgress} ref= {this.refProgressBar}/>


                </div>
            );
        }
        let itemsCategories = [];
        if (sessionFactorySource.get()){
            let categories = sessionFactorySource.get().getBlockCategoriesRef();
            for (let i = 0; i<categories.length; i++){
                itemsCategories.push(<Chip className={classes.chip} color="primary" variant="outlined"

                                           label={categories[i]}
                />)
            }
        }
        let itemsTags = [];
        if (sessionFactorySource.get()){
            let tags = sessionFactorySource.get().getTagsRef();
            for (let i = 0; i<tags.length; i++){
                itemsTags.push(<Chip className={classes.chip} color="primary" variant="outlined"

                                           label={tags[i]}
                />)
            }
        }
        let itemsTypes = [];
        if (sessionFactorySource.get()){
            let tags = sessionFactorySource.get().getPartTypesRef();
            for (let i = 0; i<tags.length; i++){
                itemsTypes.push(<Chip className={classes.chip} color="primary" variant="outlined"

                                     label={tags[i]}
                />)
            }
        }
        return (
            <div className="container">
                {progressBar}

                <GridList cellHeight={150}>
                    {tileData.map((tile) => (
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={tile.img} alt={tile.title}/>
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}

                            />
                        </GridListTile>
                    ))}
                </GridList>


                <FormControl className={classesSource}>
                    <InputLabel id="demo-simple-select-label">Source</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.source}
                        onChange={this.onSourceSelected}>
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="server">Server</MenuItem>
                        <MenuItem value="file">File</MenuItem>
                        <MenuItem value="remotefile">Remote File</MenuItem>

                    </Select>
                </FormControl>
                <FormControl className={classesTarget}>
                    <InputLabel id="demo-simple-select-label">Target</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.target}
                        onChange={this.onTargetSelected}>
                        <MenuItem value="none">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="server">Server</MenuItem>
                        <MenuItem value="remotefile">Remote File</MenuItem>

                    </Select>
                </FormControl>


                <div className={classes.root} id="containerSubData" key={1}>
                   {/* <Grid container spacing={3} key={11}>*/}
                       <Grid container item xs={12} spacing={3} >
                            {/*<React.Fragment>*/}
                                <Grid item xs={12} lg={9}  >
                                    <BlockList   target={this.state.target} name={"jpl"}
                                                handleFetchBlk={this.handleFetchBlk}
                                                onBlkIsCreated={this.onBlkIsCreated}
                                                ref={this.refBlklist}
                                                key={1111}/>

                                    <BlockContent  ref={this.refBlkContent}
                                                   onBlkPartIsCreated={this.onBlkPartIsCreated}   key="1"/>
                                </Grid>

                                <Grid item xs={12} lg={3} >
                                    <div className={classes.command}>
                                        <div id="sectionjpl" className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Commands
                                                    </Typography>
                                                </Grid>

                                            </Grid>

                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>
                                            <Button className={classes.buttoncmd}   variant="contained" color="primary"
                                                   onClick={this.onCommit}>Commit

                                            </Button>
                                            <Button className={classes.buttoncmd}  variant="contained" color="primary"
                                                    onClick={this.onExport}>Export</Button>
                                        </div>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




                                    {/*<div className={classes.command}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Block command
                                                    </Typography>
                                                </Grid>

                                            </Grid>

                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>


                                                <BlockCreation ref={this.refBlkCreation}
                                                               onBlkIsCreated={this.onBlkIsCreated} key={1121} />





                                        </div>
                                    </div>
*/}





{/*                                    <div className={classes.command}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Part command
                                                    </Typography>
                                                </Grid>

                                            </Grid>

                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>


                                                <BlockPartCreation onBlkPartIsCreated={this.onBlkPartIsCreated} ref={this.refBlkPartCreation}/>


                                        </div>
                                    </div>*/}



                                    <div className={classes.info}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Category
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                            <Typography color="textSecondary" variant="body2">
                                                Block categories availables
                                            </Typography>
                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>
                                            {itemsCategories}
                                        </div>
                                    </div>
                                    <div className={classes.info}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Tag
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                            <Typography color="textSecondary" variant="body2">
                                                Block Tags availables
                                            </Typography>
                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>
                                            {itemsTags}
                                        </div>
                                    </div>

                                    <div className={classes.info}>
                                        <div className={classes.section1}>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="h5">
                                                        Types
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                            <Typography color="textSecondary" variant="body2">
                                                Part Types availables
                                            </Typography>
                                        </div>
                                        <Divider variant="middle"/>
                                        <div className={classes.section2}>
                                            {itemsTypes}
                                        </div>
                                    </div>

                                </Grid>
                            {/*</React.Fragment>*/}
                        {/*</Grid>*/}
                    </Grid>
                </div>


            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Products);

//onRegisterBlkList={this.onRegisterBlkList}
//<BlockContent onRegisterBlk={this.onRegisterBlk} ref={this.refBlkContent} key="1"></BlockContent>
// onRegisterBlkCreation={this.onRegisterBlkCreation}
//onRegisterBlkPartCreation={this.onRegisterBlkPartCreation}