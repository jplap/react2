import React, {Component} from 'react';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({

})


class BlockCard extends Component {

    constructor(props) {
        super(props);
        this.classes = props;


        //this.onContent = this.onContent.bind(this);

    }
/*
    onContent() {
        console.log("onconytent")
        this.props.onReloadPartCard(this.props.id);
    }
*/
    render() {

        return (

            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {"Block"}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h6">
                            {this.props.category}
                        </Typography>

                    </CardContent>
                    <CardMedia
                        component="img"
                        alt={this.props.name}
                        height="140"
                        image={this.props.imagename}
                        title={this.props.name}
                    />
                    <CardContent>

                        <Typography gutterBottom variant="h5" component="h5">
                            {this.props.name}
                        </Typography>


                    </CardContent>
                </CardActionArea>

            </Card>


        );
    }

}


export default withStyles(styles, {withTheme: true})(BlockCard);

/*<CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>

 */