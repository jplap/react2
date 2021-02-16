import React, {Component} from 'react';
//import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    margin: {
        //margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

class BtnCellRenderer extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.data);
    }
    render() {
        const {classes} = this.props;
        return (
            <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
                                <DeleteIcon />
                        </IconButton>


        )
    }
}
export default withStyles(styles, {withTheme: true}) (BtnCellRenderer);
//<Button onClick={this.btnClickedHandler} color="primary" variant="contained">Remove</Button>
//<button onClick={this.btnClickedHandler}>Remove</button>

// <IconButton aria-label="delete" className={classes.margin} onClick={this.btnClickedHandler}>
//                 <DeleteIcon />
//             </IconButton>