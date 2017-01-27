import React from 'react';
import { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ContentAdd from 'material-ui/svg-icons/content/add';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


const propTypes = {
    page: React.PropTypes.string,
    changePage: React.PropTypes.func
}

export default class TabBar extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state={value:'newrecipe'}
    }
    handleChange(v) {
        console.log('handle Change called')
        this.props.changePage(v)
    }
    render() {
        return(
            <Tabs value={this.props.page} onChange={this.handleChange}>
                <Tab label="Search" onClick={() => {this.handleChange('searchrecipes')}} value="searchrecipes"/>
                <Tab label="Saved" onClick={() => {this.handleChange('recipes')}} value="recipes"/>
                <Tab icon={<ContentAdd />} onClick={() => {this.handleChange('newrecipe')}} label="New" value="newrecipe"/>
            </Tabs>
        )
    }
}

TabBar.propTypes = propTypes