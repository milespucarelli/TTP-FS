import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class TransactionRow extends Component {
  state = {
    currentPrice: 0.0,
    openPrice: 0.0,
    color: 'black'
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.ticker}`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          this.setState({ currentPrice: data[0].price.toFixed(2)})
        }
      })
    fetch(`https://api.iextrading.com/1.0/deep/official-price?symbols=${this.props.ticker}`)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render() {
    let {ticker, share, price} = this.props
    let {currentPrice} = this.state
    let performance = (currentPrice - price).toFixed(2)
    return (
      <Table.Row>
        <Table.Cell>BUY</Table.Cell>
        <Table.Cell>{ticker}</Table.Cell>
        <Table.Cell>{share}</Table.Cell>
        <Table.Cell>{currentPrice}</Table.Cell>
        <Table.Cell>{price}</Table.Cell>
        <Table.Cell>{performance > 0 ? `+${performance}` : performance}</Table.Cell>
      </Table.Row>
    );
  }

}

export default TransactionRow;
