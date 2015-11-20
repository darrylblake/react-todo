var React = require('react');
var ReactFire = require('reactfire'); // Interact with data received from Firebase
var Firebase = require('firebase'); // Library. Communicate with Firebase
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://sg-react-todo.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items'); // this.state.items
    this.fb.on('value', this.handleDataLoaded);
  },
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  render: function() {
    return <div className="row">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content" + (this.state.loaded ? ' loaded' : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  },
  deleteButton: function() {
    if (!this.state.loaded) {
      return null;
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.handleDeleteDoneClick}
          className="btn btn-default btn-lg">
          Clear Completed
        </button>
      </div>
    }
  },
  handleDeleteDoneClick: function() {
    for (var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
