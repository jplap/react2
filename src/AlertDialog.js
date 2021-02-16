import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import Dropzone from "./Dropzone";

class AlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true

        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCloseOK = this.handleCloseOK.bind(this);
        this.handleCloseCancel = this.handleCloseCancel.bind(this);

    }
    activate(){
        this.setState({open:true})
    }

    handleClickOpen(){
        this.setState({open:true})
    }
    handleCloseOK(){
        this.setState({open:false});
        this.props.handleCaller( true );
    }
    handleCloseCancel(){
        this.setState({open:false});
        this.props.handleCaller( false );
    }

    render() {

        return (
            <div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCloseOK} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default AlertDialog;

/*
<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    {this.props.title}
                </Button>
 */