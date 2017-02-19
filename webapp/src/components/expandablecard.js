import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Ingredient from './ingredient'

const propTypes = {
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
    this.handleToggle = this.handleToggle.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleReduce = this.handleReduce.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      expanded: false
    }
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleToggle(event, toggle) {

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

  render() {
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
    return (
      <div onClick={this.handleClick}>
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
                <Ingredient content={ingredient} />)
            }
          </div>
        </CardText>
        <List style={listStyle} expandable>
          {this.props.recipe.steps.map((step, i) => <ListItem style={liStyle} primaryText={`Step ${i+1}. ${step}`} /> )}
        </List>
      </Card>
      </div>
    )
  }
}

ExpandableCard.propTypes = propTypes
