import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react'
import StockRow from './StockRow'

class Portfolio extends Component {

  render() {
    let stocks = {}
    this.props.transactions.forEach(transaction => {
      stocks[transaction.ticker] = stocks[transaction.ticker] + transaction.share || transaction.share
    })
    let stocksArr = Object.keys(stocks).map(stock => ({ticker: stock, share: stocks[stock]}))
    return (
      <Container>
        <Table celled striped>
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
                <StockRow ticker={stock.ticker} share={stock.share} />
              ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }

}

export default Portfolio;
