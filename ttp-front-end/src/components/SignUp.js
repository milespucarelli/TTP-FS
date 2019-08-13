import React from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react'

const SignUp = (props) => {
  const {
    name,
    email,
    password,
    changeHandler,
    submitHandler,
    clickHandler
  } = props

  return (
    <div id='signup-card'>
      <div id='signup-inner-card'>
        <h1 className='head'>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Field>
            <input
              className='form-input'
              type='text'
              name='name'
              value={name}
              placeholder='Name...'
              onChange={changeHandler}/>
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              placeholder='Email...'
              onChange={changeHandler} />
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='password'
              name='password'
              value={password}
              placeholder='Password...'
              onChange={changeHandler}/>
          </Form.Field>
          <Button id='submit-button' type='submit'>Submit</Button>
        </Form>
        <Message id='link-caption' className='form-message' compact size='mini'>
          <Icon name='help' />
          Already registered? <a onClick={clickHandler}> Log In!</a>
        </Message>
      </div>
    </div>
  )
};

export default SignUp;
