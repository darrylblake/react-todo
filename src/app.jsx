var React = require('react');
var ReactFire = require('reactfire'); // Interact with data received from Firebase
var Firebase = require('firebase'); // Library. Communicate with Firebase
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://sg-react-todo.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    var fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(fb, 'items'); // this.state.items
    fb.on('value', this.handleDataLoaded);
  },
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content" + (this.state.loaded ? ' loaded' : '')}>
          <List items={this.state.items} />
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
