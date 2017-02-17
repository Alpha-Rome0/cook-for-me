import React from 'react';
import { Component } from 'react';

import Chip from 'material-ui/Chip'

const propTypes = {
    removeIngredient: React.PropTypes.func,
    id: React.PropTypes.number,
    content: React.PropTypes.string.isRequired
}

export default class Ingredient extends Component {
    constructor(props) {
        super(props)
    }
    handleRemove() {
        if (typeof this.props.removeIngredient !== 'undefined') {
        this.props.removeIngredient(this.props.id)
        }
    }
    render() {
        const style = { margin: 4 }
        const self = this
        console.log(typeof this.props.removeIngredient)
        if (typeof this.props.removeIngredient !== 'undefined') {
            return(
                <Chip style={style} key={this.props.id} onRequestDelete={this.handleRemove.bind(this)}>
                    {this.props.content}
                </Chip>
        )} else {
            return(<Chip style={style}>
                {this.props.content}
            </Chip>)
        }
        
    }
}

Ingredient.propTypes = propTypes