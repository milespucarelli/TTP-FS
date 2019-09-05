import React, { Component } from 'react';
import { Card, Container, List, Accordion, Icon, Modal, Grid, Button, Statistic, Divider, Header } from 'semantic-ui-react'

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
        .catch(err => this.setState({active: !this.state.active}))
    }
  }

  changeHandler = (e) => {
    this.setState({share: e.target.value})
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
                  <Statistic.Value>{parseFloat(price) === 0.00 ? 'n/a' : `$${price}`}</Statistic.Value>
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
          <Modal size='small' trigger={<Button basic color={parseFloat(price) === 0.00 ? 'red' :'green'}>Buy</Button>} closeIcon>
            <Modal.Header>{/*<Icon name='dollar sign'></Icon>*/}Buy Stock</Modal.Header>
            { price === 0 ?
              <Modal.Content>
                <h3>Price information for this company is currently unavailable. Please check back later.</h3>
              </Modal.Content> :
              <Modal.Content>
                <Modal.Description>
                  <Grid columns={2}>
                    <Grid.Row textAlign='center'>
                      <Grid.Column>
                        <Statistic>
                          <Statistic.Value>${user.balance}</Statistic.Value>
                          <Statistic.Label>BALANCE</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                      <Grid.Column>
                        <Statistic>
                          <Statistic.Value>
                            ${(user.balance - (parseInt(share) * parseFloat(price))).toFixed(2)}
                          </Statistic.Value>
                          <Statistic.Label>BALANCE AFTER PURCHASE</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Divider horizontal><h1>{symbol}</h1></Divider>
                  <Container textAlign='center'>
                    <Header style={{margin: '0'}}>Number of Shares:</Header>
                    <h1 style={{marginTop: '1%'}}>{share}</h1>
                    <input
                      type='range'
                      value={share}
                      onChange={this.changeHandler}
                      min={1}
                      max={parseInt(user.balance/parseFloat(price))} />
                      <Header>Price Per Share: {`$${price}`}</Header>
                      <Header>
                        Total Price: {`$${(parseInt(share) * parseFloat(price)).toFixed(2)}`}
                      </Header>
                      <Button
                        style={{color: 'white', backgroundColor: '#1055BC'}}
                        onClick={() => purchaseHandler(user, symbol, share, price)}>
                          Purchase
                      </Button>
                  </Container>
                </Modal.Description>
              </Modal.Content>
            }
          </Modal>
        </Card.Content>
      </Card>
    );
  }

}

export default Stock;
