import React, { Component } from 'react';
import { Card, Container, List, Button } from 'semantic-ui-react'

class Stock extends Component {
  state = {
    price: 0,
    industry: '',
    website: '',
    ceo: '',
    sector: ''
  }

  componentDidMount() {
    fetch(`https://cloud.iexapis.com/stable/stock/${this.props.symbol}/company?token=pk_3b067f6bb3e243388641ac4995837a75&filter=industry,website,CEO,sector`)
      .then(res => res.json())
      .then(data => this.setState({
        sector: data.sector,
        industry: data.industry,
        website: data.website,
        ceo: data.CEO
      }))
    fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.symbol}`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          this.setState({ price: data[0].price})
        }
      })
  }

  render() {
    let {name, symbol} = this.props
    let {price, industry, website, ceo, sector} = this.state
    return (
      <Card key={symbol}>
        <Card.Content>
          <Card.Header><a href={website}>{name ? name : symbol}</a></Card.Header>
          <Card.Meta><h3>{symbol}</h3></Card.Meta>
          <Card.Description>
            <Container>
              <List>
                <List.Item>
                  <List.Header>Price</List.Header>
                  {price === 0 ? 'n/a' : price}
                </List.Item>
                <List.Item>
                  <List.Header>Industry</List.Header>
                  {industry ? industry : 'n/a'}
                </List.Item>
                <List.Item>
                  <List.Header>Sector</List.Header>
                  {sector ? sector : 'n/a'}
                </List.Item>
                <List.Item>
                  <List.Header>CEO</List.Header>
                  {ceo ? ceo : 'n/a'}
                </List.Item>
              </List>
            </Container>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color={price === 0 ? 'red' :'green'}>Buy</Button>
        </Card.Content>
      </Card>
    );
  }

}

export default Stock;
