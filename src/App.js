import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import ColorList from './ColorList/ColorList';
import axios from 'axios';

// Allowing us to access reduxState on props
const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      color: ''
    }
  }

  handleColorChange = (event) => {
    this.setState({
      color: event.target.value
    })
  }

  // TODO: Rename to sendColorToServer
  sendColorToServer = () => {
    // Send the color to redux with an action type of ADD_COLOR
    const body = {name: this.state.color, count: 1};
    //Post Body to /api/colors
    axios.post('/api/colors', body)
    .then( res => {
        this.refreshData();
        this.setState({
            color: ''
        })
    }).catch( err => {
        console.log( 'error in post', err );
    });
  }

  deleteAllColors = () => {
    const action = {type: 'DELETE_COLORS'};
    this.props.dispatch(action);
  }

  refreshData() {;
    //Get data from /api/colors
    axios.get('/api/colors')
    .then( res => {
        console.log(res.data);
        
        const action = { type: 'SET_COLORS', payload: res.data }
        this.props.dispatch(action)
    }).catch( err => {
        console.log( 'error in get', err );
    })
  }

  componentDidMount() {
    this.refreshData();
  }

  render() {
    console.log('Rendering App.js');
    return (
      <div className="App">
        <pre>{JSON.stringify(this.props.reduxStore)}</pre>
        {/* The value of the reducer will be what state is */}
        <div>{this.props.reduxStore.counterReducer}</div>
        {/* dispatch takes in an action */}
        <button onClick={() => this.props.dispatch({type: 'ADD'})}>Add</button>
        {/* Subtract button */}
        <button onClick={() => this.props.dispatch({type: 'SUBTRACT'})}>Subtract</button>

        <h3>Enter Color Here:</h3>
        <input onChange={this.handleColorChange} value={this.state.color} />
        <button onClick={this.sendColorToServer}>Submit</button>
        <button onClick={this.deleteAllColors}>Delete ALL Colors</button>
        <ColorList />
        
      </div>
    );
  }
}

// connect() allows us to dispatch
// connect(mapReduxStateToProps) to access information
export default connect(mapReduxStateToProps)(App); // Currying, a function that returns a function
