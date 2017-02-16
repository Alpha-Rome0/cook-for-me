import React from 'react';
import { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import _ from 'lodash'

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
    return (
      <div onClick={this.handleClick}>
      <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          titleStyle={titleStyle}
          title={this.props.recipe.title}
          subtitle={this.props.recipe.description.summary}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <List expandable>
          {_.each(this.props.recipe.steps, (step) => {
            (<div><ListItem primaryText={step} /><Divider /></div>)
          })}
        </List>
      </Card>
      </div>
    )
  }
}

ExpandableCard.propTypes = propTypes
