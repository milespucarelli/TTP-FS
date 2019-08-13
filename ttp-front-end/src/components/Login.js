import React from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react'

const Login = (props) => {
  const {email, password} = props
  return (
    <div id='login-card'>
      <div id='login-inner-card'>
        <h1 className='head'>Login</h1>
        <Form onSubmit={props.submitHandler}>
          <Form.Field>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              placeholder='Email...'
              onChange={props.changeHandler}/>
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='password'
              name='password'
              value={password}
              placeholder='Password...'
              onChange={props.changeHandler}/>
          </Form.Field>
          <Button id='submit-button' type='submit'>Submit</Button>
        </Form>
        <Message id='link-caption' className='form-message' compact size='mini'>
          <Icon name='help' />
          New user? <a onClick={props.clickHandler}> Sign Up!</a>
        </Message>
      </div>
    </div>
  );
}

export default Login;
