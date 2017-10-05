import React, {Component} from 'react';

import logo from './logo.svg';
import './home.css';
import InputField from '../general/input-field';
import services from '../../services/service';
import constants from '../../helpers/constants';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this
      .login
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
  }
  login(event) {
    if (this.state.username && this.state.password) {
      console.log("calling login service ");
      console.log(this.state);
      services.getUsingAxios(constants.baseUrl);
    }
  }
  onChange(event) {
    if(Object.keys(this.state).includes(event.target.name)){
      let updatedState = this.state;
      updatedState[event.target.name] = event.target.value;
      this.setState(updatedState);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to Taxiz</h1>
          </header>
          <p className="App-intro">
            To get started, edit
            <code>src/App.js</code>
            and save to reload.
          </p>
        </div>
        <InputField labelName="username" id="username" value={this.state.username} placeholder="username" onChange={this.onChange} required/>
        <InputField labelName="password" id="password" value={this.state.password} placeholder="password" type="password" onChange={this.onChange} required/>
        <button type="submit" onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Home;