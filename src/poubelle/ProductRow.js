import React from 'react';

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }
    fetchDetails() {
        console.log(this.props.product.id);
        this.props.handleFetch(this.props.product.id);

        //this.props.onDestroy(this.props.product.id);
    }
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr onClick={this.fetchDetails}>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.tag}</td>
                <td><button onClick={this.destroy}>x</button></td>
            </tr>
        );
    }
}

export default ProductRow;