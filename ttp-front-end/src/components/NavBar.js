import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class NavBar extends Component {
  state = {
    activeItem: this.props.location.pathname.substring(1)
  }

  clickHander = (e, { name }) => {
    this.props.history.push(`/${name}`)
    this.setState({activeItem: name})
  }

  render() {
    let {activeItem} = this.state
    let loc = this.props.location.pathname
    return (
      <div className='navbar'
        style={(loc === '/login' || loc === '/signup') ? {display: 'none'} : {}}>
        <Menu pointing secondary>
          <Menu.Item
            name='portfolio'
            active={activeItem === 'portfolio'}
            onClick={this.clickHander}
          />
          <Menu.Item
            name='transactions'
            active={activeItem === 'transactions'}
            onClick={this.clickHander}
          />
          <Menu.Item
            name='marketplace'
            active={activeItem === 'marketplace'}
            onClick={this.clickHander}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOut}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }

}

export default withRouter(NavBar);
