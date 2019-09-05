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
    fetch(`https://api.iextrading.com/1.0/deep/official-price?symbols=${this.props.ticker}`)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render() {
    let {ticker, share, clickHandler} = this.props
    let {currentPrice} = this.state
    let value = (parseInt(share) * parseFloat(currentPrice)).toFixed(2)
    return (
      <Table.Row>
        <Table.Cell className='portfolio-ticker' onClick={() => clickHandler(ticker)}>{ticker}</Table.Cell>
        <Table.Cell>{share}</Table.Cell>
        <Table.Cell>{`$${currentPrice}`}</Table.Cell>
        <Table.Cell>{`$${value}`}</Table.Cell>
      </Table.Row>
    );
  }

}

export default StockRow;
