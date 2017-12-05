import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Items } from './items.js';

export default class Item extends Component {

  deleteThisItem() {
    Meteor.call('items.remove', this.props.item._id);

  }


  render() {


    return (
      <li>
        <button className="delete" onClick={this.deleteThisItem.bind(this)}>
          &times;
        </button>

        <img src = {this.props.item.image}/>
        <br></br>
        <span className="text" >
          Item Name: {this.props.item.text}
          <br></br>
          Item description: {this.props.item.description}
        </span>
      </li>
    );
  }
}
