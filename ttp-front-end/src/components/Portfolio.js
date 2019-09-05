import React, { Component } from 'react';
import { Container, Grid, Statistic, Table } from 'semantic-ui-react'
import StockRow from './StockRow'
import StockInfo from './StockInfo'


class Portfolio extends Component {
  state = {
    stock: {},
    image: ''
  }

  clickHandler = (ticker) => {
    fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/company?token=pk_3b067f6bb3e243388641ac4995837a75`)
      .then(res => res.json())
      .then(data => this.setState({stock: data}))

    fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=pk_3b067f6bb3e243388641ac4995837a75`)
      .then(res => res.json())
      .then(data => this.setState({image: data.url}))
  }

  render() {
    let stocks = {}
    this.props.transactions.forEach(transaction => {
      stocks[transaction.ticker] = stocks[transaction.ticker] + transaction.share || transaction.share
    })
    let stocksArr = Object.keys(stocks).map(stock => ({ticker: stock, share: stocks[stock]}))
    return (
      <Container>
        <h1 className='page-banner'>Portfolio</h1>
        <Grid divided>
          <Grid.Row columns={2}>
            <Grid.Column width={5} verticalAlign='middle'>
              <Statistic inverted className='dropshadow'>
                <Statistic.Value>${this.props.user.balance}</Statistic.Value>
                <Statistic.Label>BALANCE</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={11}>
              <StockInfo stock={this.state.stock} image={this.state.image}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table celled striped id='portfolio-table'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Stock</Table.HeaderCell>
                    <Table.HeaderCell>Shares</Table.HeaderCell>
                    <Table.HeaderCell>Current Price</Table.HeaderCell>
                    <Table.HeaderCell>Total Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {stocksArr.map(stock => (
                      <StockRow ticker={stock.ticker} share={stock.share} clickHandler={this.clickHandler}/>
                    ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

}

export default Portfolio;
