import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Items } from './items.js';

import Item from './Item.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.desInput).value.trim();

    Meteor.call('items.insert', text, description);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.desInput).value = '';

  }

  search() {
    event.preventDefault();

    const string = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();
    Meteor.call('items.find', string);
    ReactDOM.findDOMNode(this.refs.searchInput).value = '';
/*
render the search result...?
*/

  }


  renderItems() {
    let filteredItems = this.props.items;

    return filteredItems.map((item) => {

      return (
        <Item
          key={item._id}
          item={item}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>New Products of iPhone 2017 </h1>

          <form className="new-item"  >
            <input
              type="text"
              ref="textInput"
              placeholder="(Type to add new items)"
            />
            <br></br>
            <input
              type="text"
              ref="desInput"
              placeholder="(Type to add descriptions)"
            />
            <br></br>
            <button onClick={this.handleSubmit.bind(this)}>
              Add
            </button>
          </form>

          <button className = 'displayAll' onClick = {this.renderItems()}>
            Display All
          </button>

          <input
            type="text"
            ref="searchInput"
            placeholder="(Search from item's name)"
          />
          <br></br>
          <button /*onClick={this.search.bind(this)}*/>
            Search
          </button>
          <div>
            Found items number: {}
          </div>

        </header>

        <ul>
          {this.renderItems()}
        </ul>
        Total number: {Items.find().count()}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('items');

  return {
    items: Items.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
