import React, { Component } from 'react';
import Chips from 'react-chips'


class BlockTags extends Component {

    constructor(props) {
        super(props);
        //////chips: ["Your","my"]
        this.state = {

            chips: props.chips ,
            chipsSuggestions: props.chipsSuggestions
        }
        this.someAsynCall =  this.someAsynCall.bind(this);
    }
    componentDidMount() {
        console.log("componentDidMount")
    }

    onChange = chips => {
        this.setState({ chips });
        this.props.handleChangeTags(chips);
    }
    someAsynCall(e){
        console.log("someAsynCall")
    }

    render() {
        return (
            <div>
                <h2>Tags</h2>
                <Chips
                    value={this.props.chips}
                    onChange={this.onChange}
                    suggestions={this.props.chipsSuggestions}


                />
            </div>
        );
    }
}
export default BlockTags;
//suggestions={["Your", "Data", "Here"]}