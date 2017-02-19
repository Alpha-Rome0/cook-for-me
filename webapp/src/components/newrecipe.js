import React from 'react'
import { Component } from 'react'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'

import Step from './step'
import InputStep from './input'
import Ingredient from './ingredient'

const propTypes = {
  title: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array.isRequired,
  ingredients: React.PropTypes.array.isRequired,
  duration: React.PropTypes.string.isRequired,
  summary: React.PropTypes.string.isRequired,
  addStep: React.PropTypes.func.isRequired,
  removeStep: React.PropTypes.func.isRequired,
  submitRecipe: React.PropTypes.func.isRequired,
  addIngredient: React.PropTypes.func.isRequired,
  removeIngredient: React.PropTypes.func.isRequired,
  updateTitle: React.PropTypes.func.isRequired,
  updateDuration: React.PropTypes.func.isRequired,
  updateSummary: React.PropTypes.func.isRequired,
}

export default class NewRecipe extends Component {
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSummaryChange = this.handleSummaryChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleIngredientChange = this.handleIngredientChange.bind(this)
    this.handleAddIngredient = this.handleAddIngredient.bind(this)
    this.state = {
      ingredient:''
    }
  }
  handleTitleChange(e,v) {
    this.props.updateTitle(v)
  }
  handleDurationChange(e,v) {
    this.props.updateDuration(v)
  }
  handleSummaryChange(e,v) {
    this.props.updateSummary(v)
  }
  handleIngredientChange(e,v) {
    const newState = this.state
    newState.ingredient = v
    this.setState(newState)
  }
  handleAddIngredient(e) {
    this.props.addIngredient(this.state.ingredient)
    const newState = this.state
    newState.ingredient = ''
    this.setState(newState)
    e.preventDefault()
  }
  render() {
    const self = this
    const titleStyle = {
      fontSize: 25
    }
    const cardStyle = {
      marginTop: 10,
      marginBottom: 10
    }
    const wrapperStyle = {
      display: 'flex',
      flexWrap: 'wrap',
    }
    return (
      <div className="page">
        <div className="content">
          <Card>
            <CardText>
              <TextField hintText="Grandma's Cookies..." floatingLabelText="Recipe Name" floatingLabelFixed fullWidth onChange={this.handleTitleChange} value={this.props.title}/>
              <TextField hintText="Delicious and warm cookies that are easy to bake!" floatingLabelText="Summary" floatingLabelFixed fullWidth onChange={this.handleSummaryChange} value={this.props.summary} />
              <TextField floatingLabelText="Duration (minutes)" floatingLabelFixed onChange={this.handleDurationChange} value={this.props.duration} type="number" />
            </CardText>
          </Card>
          <Card style={cardStyle}>
            <CardText>
              <form onSubmit={this.handleAddIngredient}>
                <TextField floatingLabelText="Add Ingredients" floatingLabelFixed fullWidth onChange={this.handleIngredientChange} value={this.state.ingredient} />
                <input type="submit" style={{visibility: 'hidden'}} />
              </form>
              <div style={wrapperStyle}>
              {
                this.props.ingredients.map((ingredient, i) =>
                  <Ingredient id={i} removeIngredient={this.props.removeIngredient} content={ingredient} />)
              }
              </div>
            </CardText>
          </Card>
          { this.props.steps.map((step, i) =>
              <Step removeStep={self.props.removeStep} id={i} content={step} />)
          }
          <InputStep submitRecipe={self.props.submitRecipe} addStep={self.props.addStep} />
        </div>
      </div>
    )
  }
}

NewRecipe.propTypes = propTypes;