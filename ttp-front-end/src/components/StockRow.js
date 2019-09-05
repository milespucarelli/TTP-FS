import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class StockRow extends Component {
  state = {
    currentPrice: 0.0
  }
  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.ticker}`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          this.setState({ currentPrice: data[0].price.toFixed(2)})
        }
      })
  }

  render() {
    let {ticker, share} = this.props
    let {currentPrice} = this.state
    let value = (share * currentPrice).toFixed(2)
    return (
      <Table.Row>
        <Table.Cell>{ticker}</Table.Cell>
        <Table.Cell>{share}</Table.Cell>
        <Table.Cell>{currentPrice}</Table.Cell>
        <Table.Cell>{value}</Table.Cell>
      </Table.Row>
    );
  }

}

export default StockRow;
