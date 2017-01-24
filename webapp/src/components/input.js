import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
    addStep: React.PropTypes.func.isRequired,
    submitRecipe: React.PropTypes.func.isRequired
}

export default class InputStep extends Component {
    constructor(props) {
        super(props)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.submitStep = this.submitStep.bind(this)
        this.submitRecipe = this.submitRecipe.bind(this)
        this.state = { text: '' }
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value })
    }
    submitStep(e) {
        e.preventDefault()
        this.props.addStep(this.state.text)
        this.setState({ text: '' })
    }
    submitRecipe() {
        this.props.submitRecipe()
        this.setState({ text: '' })
    }
    render() {
        return (
            <div className="block">
                <Card>
                    <CardText>
                        <TextField
                            hintText="Preheat oven to 350 degrees..."
                            floatingLabelText="Add New Step"
                            floatingLabelFixed
                            value={this.state.text}
                            onChange={this.handleTextChange}
                            multiLine
                            fullWidth
                        />
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            primary
                            label="Add"
                            onClick={this.submitStep}
                        />
                        <RaisedButton
                            className="right"
                            label="Submit Recipe"
                            backgroundColor="#a4c639"
                            labelColor="#ffffff"
                            onClick={this.submitRecipe}
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

InputStep.propTypes = propTypes