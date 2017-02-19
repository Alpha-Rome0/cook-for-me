import React from 'react'
import { Component } from 'react'

import { SEARCH_ONLINE } from '../env.js'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import RecipeCard from './recipecard'

export default class SearchRecipe extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getResults = this.getResults.bind(this)
    this.state = {
      searchResults:[],
      search:'',
    }
  }
  getResults() {
    return fetch(`${SEARCH_ONLINE}?ingredients=${this.state.search}`)
      .then((response) => response.json()).then((responseJson) => {
        console.log(responseJson)
        const newState = this.state
        newState.search = ''
        newState.searchResults=responseJson
        this.setState(newState)
        return responseJson
      })
  }
  handleSearch(e) {
    this.getResults()
    e.preventDefault()
  }
  handleSearchChange(e,v) {
    const newState = this.state
    newState.search = v
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
    const textStyle = {
      textAlign: 'center'
    }
    return(
      <div className="page">
      <div className="content">
        <Card style={cardStyle}>
          <CardHeader
            titleStyle={titleStyle}
            title="Search Recipes Online"
          />
          <CardText style={textStyle}>
            <form onSubmit={this.handleSearch}>
              <TextField hintText='search' fullWidth onChange={this.handleSearchChange} value={this.state.search}/>
              <input type="submit" style={{visibility: 'hidden'}} />
            </form>
          </CardText>
        </Card>
      </div>
      <div style={wrapperStyle}>
        {
          this.state.searchResults.map((recipe, i) =>
            <RecipeCard recipe={recipe} />)
        }
      </div>
      </div>
    )
  }
}
