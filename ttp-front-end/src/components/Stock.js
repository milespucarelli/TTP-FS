import React, { Component } from 'react';
import { Card, Container, List, Modal, Button, Statistic, Divider, Header } from 'semantic-ui-react'
import Slider from '@material-ui/core/Slider';

class Stock extends Component {
  state = {
    price: 0,
    industry: '',
    website: '',
    ceo: '',
    sector: '',
    share: 1
  }

  changeHandler = (e) => {
    this.setState({share: e.target.value})
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
    let {name, symbol, user, purchaseHandler} = this.props
    let {price, industry, website, ceo, sector, share} = this.state
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
          <Modal size='tiny' trigger={<Button basic color={price === 0 ? 'red' :'green'}>Buy</Button>} closeIcon>
            <Modal.Header>{/*<Icon name='dollar sign'></Icon>*/}Buy Stock</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Statistic>
                  <Statistic.Value>${user.balance}</Statistic.Value>
                  <Statistic.Label>BALANCE</Statistic.Label>
                </Statistic>
                <Divider horizontal><h1>{symbol}</h1></Divider>
                <Container textAlign='center'>
                  <Header>{share}</Header>
                  { /* <Slider
                    defaultValue={1}
                    value={share}
                    onChange={this.changeHandler}
                    step={1}
                    min={1}
                    max={parseInt(user.balance/price)}/> */ }
                  <input
                    type='range'
                    value={share}
                    onChange={this.changeHandler}
                    min={1}
                    max={parseInt(user.balance/price)} />
                    <Header>{price}</Header>
                    <Header>{(share * price).toFixed(2)}</Header>
                    <Button onClick={() => purchaseHandler(user, symbol, share, price)}>Purchase</Button>
                </Container>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    );
  }

}

export default Stock;
