import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
    removeStep: React.PropTypes.func,
    id: React.PropTypes.number,
    content: React.PropTypes.string
}

export default class Step extends Component {
    constructor(props) {
        super(props)
        this.handleRemove = this.handleRemove.bind(this)
    }
    handleRemove() {
        console.log('remove called')
        this.props.removeStep(this.props.id)
    }
    render() {
        return (
            <div className='step'>
                <Card>
                    <CardTitle>
                        {`Step ${this.props.id + 1}`}
                    </CardTitle>
                    <CardText>
                        {this.props.content}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            secondary
                            label='remove'
                            onClick={this.handleRemove}
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

Step.propTypes = propTypes