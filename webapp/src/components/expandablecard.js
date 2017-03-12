import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

import Ingredient from './ingredient'

import { updateRecipe } from '../actions/ext';



const propTypes = {
    index: React.PropTypes.number.isRequired,
    recipe: React.PropTypes.object.isRequired
}

const cardStyle = {
  marginTop: 10,
  marginBottom: 10
}

const titleStyle = {
  fontSize: 25
}

export default class ExpandableCard extends Component {

  constructor(props) {
    super(props);
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleReduce = this.handleReduce.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCancelDialog = this.handleCancelDialog.bind(this)
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleStepChange = this.handleStepChange.bind(this)
    this.removeIngredient = this.removeIngredient.bind(this)
    this.handleIngredientChange = this.handleIngredientChange.bind(this)
    this.handleAddIngredient = this.handleAddIngredient.bind(this)
    this.handleDeleteStep = this.handleDeleteStep.bind(this)
    const copyRecipe = this.props.recipe
    this.state = {
      expanded: false,
      editing: false,
      title: copyRecipe.title,
      ingredients: copyRecipe.ingredients,
      duration: copyRecipe.description.duration,
      summary: copyRecipe.description.summary,
      steps: copyRecipe.steps,
      ingredient:''
    }
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleExpand() {
    this.setState({expanded: true});
  }

  handleReduce() {
    this.setState({expanded: false});
  }

  handleClick(e) {
    this.setState({expanded: !this.state.expanded})
  }

  handleOpenDialog() {
    this.setState({editing: true})
  }

  handleUpdateRecipe() {
    const newRecipe = {
      title: this.state.title,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      description: {
        duration: this.state.duration,
        summary: this.state.summary
      }
    }
    updateRecipe(this.props.index, newRecipe)
    this.handleCancelDialog()

  }

  handleCancelDialog() {
    this.setState({editing: false})
  }

  handleStepChange(e,v) {
    const newState = this.state
    newState.steps[e.target.name] = v
    this.setState(newState)
  }

  handleTextChange(e,v) {
    const newState = this.state
    newState[e.target.name] = v
    this.setState(newState)
  }

  removeIngredient(i) {
    const newState = this.state
    newState.ingredients.splice(i, 1)
    this.setState(newState)
  }

  handleIngredientChange(e,v) {
    const newState = this.state
    newState.ingredient = v
    this.setState(newState)
  }

  handleAddIngredient(e) {
    const newState = this.state
    newState.ingredients.push(this.state.ingredient)
    newState.ingredient = ''
    this.setState(newState)
    e.preventDefault()
  }

  handleDeleteStep(i) {
    console.log(this.props.recipe)
    const newState = this.state
    newState.steps.splice(i,1)
    this.setState(newState)
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleCancelDialog}
      />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.handleUpdateRecipe}
      />
    ]
    const listStyle = {
      backgroundColor: '#f5f5f5'
    }
    const liStyle = {
      paddingLeft: 20
    }
    const wrapperStyle = {
      display: 'flex',
      flexWrap: 'wrap',
    }
    const stepStyle = {
      width: '90%'
    }
    return (
      <div>
      <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          titleStyle={titleStyle}
          title={this.props.recipe.title}
          subtitle={`${this.props.recipe.description.summary} - ${this.props.recipe.description.duration} minutes`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable>
          <div style={wrapperStyle}>
            {
              this.props.recipe.ingredients.map((ingredient, i) => 
                <Ingredient key={i} content={ingredient} />)
            }
          </div>
        </CardText>
        <List style={listStyle} expandable>
          {this.props.recipe.steps.map((step, i) => <ListItem key={i} style={liStyle} primaryText={`Step ${i+1}. ${step}`} /> )}
        </List>
        <CardActions expandable>
          <FlatButton label="edit" onTouchTap={this.handleOpenDialog}/>
        </CardActions>
      </Card>
      <Dialog
        title="Edit Recipe"
        actions={dialogActions}
        modal
        open={this.state.editing}
      >
        <TextField
          floatingLabelText="Title"
          floatingLabelFixed
          fullWidth
          name="title"
          value={this.state.title}
          onChange={this.handleTextChange} />
        <TextField
          floatingLabelText="Duration"
          floatingLabelFixed
          type="number"
          name="duration"
          value={this.state.duration}
          onChange={this.handleTextChange} />
        <TextField
          floatingLabelText="Summary"
          floatingLabelFixed
          fullWidth
          name="summary"
          value={this.state.summary}
          onChange={this.handleTextChange} />
        <form onSubmit={this.handleAddIngredient}>
          <TextField floatingLabelText="Add Ingredients" floatingLabelFixed fullWidth onChange={this.handleIngredientChange} value={this.state.ingredient} />
          <input type="submit" style={{visibility: 'hidden'}} />
        </form>
        <div style={wrapperStyle}>
        {
          this.state.ingredients.map((ingredient, i) =>
            <Ingredient key={i} id={i} removeIngredient={this.removeIngredient} content={ingredient} />)
        }
        </div>
        {
          this.state.steps.map((step, i) =>
            <div key={i}>
              <TextField
                name={`${i}`}
                value={step}
                onChange={this.handleStepChange}
                floatingLabelText={`Step ${i + 1}`}
                floatingLabelFixed
                style={stepStyle}
              />
              <IconButton tooltip="Delete Step" onTouchTap={this.handleDeleteStep.bind(i)}>
                <Delete />
              </IconButton>
            </div>
          )
        }
      </Dialog>
      </div>
    )
  }
}

ExpandableCard.propTypes = propTypes
