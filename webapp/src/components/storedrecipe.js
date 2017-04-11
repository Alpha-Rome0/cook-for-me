import React from 'react'
import { Component } from 'react'
import {ALL_RECIPES} from '../env.js'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'

import ExpandableCard from './expandablecard'
import Ingredient from './ingredient'

export default class StoredRecipe extends Component {
  constructor(props) {
    super(props)
    this.getRecipes = this.getRecipes.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.state = {
      recipes:[],
      filter:'',
    }
  }
  componentDidMount() {
    this.getRecipes()
  }
  getRecipes() {
    return fetch(ALL_RECIPES)
    .then((response) => response.json())
    .then((responseJson) => {
      const newState = this.state
      newState.recipes=responseJson
      this.setState(newState)
      console.log(responseJson)
      return responseJson
    })
  }
  handleFilterChange(e,v) {
    const newState = this.state
    newState.filter = v
    this.setState(newState)
  }
  render() {
    const self = this;
    const titleStyle = {
      fontSize: 25
    }
    const cardStyle = {
      marginTop: 10,
      marginBottom: 10
    }
    return (
      <div className="page">
        <div className="content">
          <Card>
            <CardHeader
              titleStyle={titleStyle}
              title="Saved Recipes"
            />
            <CardText>
              <TextField hintText='search' onChange={this.handleFilterChange} value={this.state.filter}/>
            </CardText>
          </Card>
          { this.state.recipes.filter((recipe) => recipe.title.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter == '').map((recipe, i) =>
              <ExpandableCard key={i} recipe={recipe} expanded={false} index={i} refresh={this.getRecipes}/>
            )
          }
        </div>
      </div>
    )
  }
}