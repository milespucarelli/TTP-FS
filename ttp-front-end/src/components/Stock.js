import React, { Component } from 'react';
import { Card, List, Button } from 'semantic-ui-react'

class Stock extends Component {
  state = {
    sector: '',
    securityType: '',
    price: 0
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/tops?symbols=${this.props.symbol}`)
      .then(res => res.json())
      .then(data => this.setState({
        price: data[0].lastSalePrice,
        sector: data[0].sector,
        securityType: data[0].securityType
      }))
  }

  render() {
    let {name, symbol} = this.props
    return (
      <Card key={symbol}>
        <Card.Content>
          <Card.Header>{name ? name : symbol}</Card.Header>
          <Card.Meta>{symbol}</Card.Meta>
          <Card.Description>
            <List>
              <List.Item>
                <List.Header>Price</List.Header>
                {this.state.price === 0 ? 'n/a' : this.state.price}
              </List.Item>
              <List.Item>
                <List.Header>Sector</List.Header>
                {this.state.sector}
              </List.Item>
              <List.Item>
                <List.Header>Security Type</List.Header>
                {this.state.securityType}
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color={this.state.price === 0 ? 'red' :'green'}>Buy</Button>
        </Card.Content>
      </Card>
    );
  }

}

export default Stock;
