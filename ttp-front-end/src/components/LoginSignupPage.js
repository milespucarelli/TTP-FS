import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';

class LoginSignupPage extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    clicked: this.props.history.location.pathname === '/login'
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginSubmitHandler = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: {email, password}})
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.setItem("token", data.jwt)
          this.props.setUser(data.user)
        }
      })
      .catch(console.error)
  }

  clickHandler = () => {
    this.state.clicked ?
      this.props.history.push('/signup') :
      this.props.history.push('/login')
    this.setState(
      {
        email: '',
        username: '',
        password: '',
        bio: '',
        image: '',
        clicked: !this.state.clicked
      })
  }

  signUpSubmitHandler = (e) => {
    e.preventDefault()
    const {email, name, password} = this.state
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: {email, name, password}})
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.setItem("token", data.jwt)
          this.props.setUser(data.user)
        }
      })
      .catch(console.error)
  }

  render() {
    let {
      email,
      name,
      password,
      clicked
    } = this.state

    let {
      changeHandler,
      loginSubmitHandler,
      signUpSubmitHandler,
      clickHandler
    } = this

    return (
      <div className='overlay'>
        { this.props.user ?
          <Redirect to='/portfolio' /> :
          clicked ?
          <Login
            email={email}
            password={password}
            changeHandler={changeHandler}
            submitHandler={loginSubmitHandler}
            clickHandler={clickHandler}/> :
          <SignUp
            email={email}
            name={name}
            password={password}
            changeHandler={changeHandler}
            submitHandler={signUpSubmitHandler}
            clickHandler={clickHandler}/>
        }
      </div>
    )
  }
}

export default LoginSignupPage
