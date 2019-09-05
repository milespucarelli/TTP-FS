import React, { Component } from 'react';
import { Card, Container, List, Accordion, Icon, Modal, Button, Statistic, Divider, Header } from 'semantic-ui-react'
import Slider from '@material-ui/core/Slider';

class Stock extends Component {
  state = {
    name: '',
    industry: '',
    website: '',
    ceo: '',
    sector: '',
    share: 1,
    active: false
  }

  clickHandler = () => {
    if (this.state.active) {
      this.setState({active: !this.state.active})
    } else {
      fetch(`https://cloud.iexapis.com/stable/stock/${this.props.symbol}/company?token=pk_3b067f6bb3e243388641ac4995837a75&filter=industry,website,CEO,sector,companyName`)
        .then(res => res.json())
        .then(data => this.setState({
          name: data.companyName,
          sector: data.sector,
          industry: data.industry,
          website: data.website,
          ceo: data.CEO,
          active: !this.state.active
        }))
    }
  }

  changeHandler = (e) => {
    this.setState({share: e.target.value})
  }

  componentDidMount() {
    // fetch(`https://cloud.iexapis.com/stable/stock/${this.props.symbol}/company?token=pk_3b067f6bb3e243388641ac4995837a75&filter=industry,website,CEO,sector`)
    //   .then(res => res.json())
    //   .then(data => this.setState({
    //     sector: data.sector,
    //     industry: data.industry,
    //     website: data.website,
    //     ceo: data.CEO
    //   }))
    //   .catch(err => {return err})
    // fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.symbol}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data[0]) {
    //       this.setState({ price: data[0].price})
    //     }
    //   })
  }

  render() {
    let {symbol, price, user, purchaseHandler} = this.props
    let {name, industry, website, ceo, sector, share, active} = this.state
    return (
      <Card key={symbol}>
        <Card.Content>
          <Card.Header>{symbol}</Card.Header>
          <Divider/>
          <Card.Description>
            <Container>
                <Statistic size='mini'>
                  <Statistic.Label>PRICE</Statistic.Label>
                  <Statistic.Value>{price === 0 ? 'n/a' : `$${price}`}</Statistic.Value>
                </Statistic>
                <Accordion>
                  <Accordion.Title active={active} onClick={this.clickHandler}>
                    <Icon name='dropdown' /> Details
                  </Accordion.Title>
                  <Accordion.Content active={active}>
                    <List>
                      <Header><a href={website}>{name}</a></Header>
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
                  </Accordion.Content>
                </Accordion>
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
