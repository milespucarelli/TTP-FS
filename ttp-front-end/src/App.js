import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import LoginSignupPage from './components/LoginSignupPage'
import Portfolio from './components/Portfolio'
import './App.css';

class App extends Component {
  state = {
    user: undefined
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  componentDidMount() {
    let token = localStorage.token;
    fetch("http://localhost:3000/api/v1/get_user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setUser({user: data.user})
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' render={(props) => <LoginSignupPage {...props} user={this.state.user} setUser={this.setUser} />} />
          <Route path='/signup' component={(props) => <LoginSignupPage {...props} user={this.state.user} setUser={this.setUser} />} />
          <Route path='/portfolio' component={Portfolio} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
