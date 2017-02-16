import React from 'react';
import { Component } from 'react';

import Chip from 'material-ui/Chip'

const propTypes = {
    removeIngredient: React.PropTypes.func.isRequired,
    id: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired
}

export default class Ingredient extends Component {
    constructor(props) {
        super(props)
    }
    handleRemove() {
        this.props.removeIngredient(this.props.id)
    }
    render() {
        const style = { margin: 4 }
        const self = this
        return(
            <Chip style={style} key={this.props.id} onRequestDelete={this.handleRemove.bind(this)}>
                {this.props.content}
            </Chip>
        )
    }
}

Ingredient.propTypes = propTypes