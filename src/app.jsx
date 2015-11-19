var React = require('react');
var ReactFire = require('reactfire'); // Interact with data received from Firebase
var Firebase = require('firebase'); // Library. Communicate with Firebase
var Header = require('./header');
var rootUrl = 'https://sg-react-todo.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items'); // this.state.items
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
