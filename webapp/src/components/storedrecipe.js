import React from 'react'
import { Component } from 'react'
import {ALL_RECIPES} from '../env.js'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'

import ExpandableCard from './expandablecard'
import Ingredient from './ingredient'
import RecipeCard from './recipecard'

import { getBookmarks } from '../actions/ext.js'

export default class StoredRecipe extends Component {
  constructor(props) {
    super(props)
    this.getRecipes = this.getRecipes.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.state = {
      recipes:[],
      filter:'',
      bookmarks:[]
    }
  }
  componentDidMount() {
    this.getRecipes()
    getBookmarks().then((response) => {
      const newState = this.state
      newState.bookmarks = response
      this.setState(newState)
    })
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
    const wrapperStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
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
          <Card>
            <CardHeader
              titleStyle={titleStyle}
              title="Bookmarked Recipes"
            />
          </Card>
        </div>
        <div style={wrapperStyle}>
          {
            this.state.bookmarks.filter((bookmark) => bookmark.title.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter == '').map((bookmark, i) => 
              <RecipeCard recipe={bookmark} bookmarked />
            )
          }
          </div>
      </div>
    )
  }
}