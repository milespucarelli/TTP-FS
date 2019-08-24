import React, { Component } from 'react';
import { Container, Card, Button } from 'semantic-ui-react'
import Stock from './Stock'

class Marketplace extends Component {
  state = {
    stocks: [],
    loadedStocks: [],
    upperRange: 120
  }

  clickHandler = () => {
    if (this.state.upperRange + 120 <= this.state.stocks.length) {
      this.setState({
        loadedStocks: this.state.stocks.slice(0, this.state.upperRange + 120),
        upperRange: this.state.upperRange + 120
      })
    } else {
      this.setState({loadedStocks: this.state.stocks.slice(0, this.state.stocks.length)})
    }
  }

  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/ref-data/symbols')
      .then(res => res.json())
      .then(data => this.setState({stocks: data, loadedStocks: data.slice(0, 120)}))
  }

  render() {
    return (
      <Container>
        <Card.Group itemsPerRow={4}>
          {this.state.loadedStocks.map(stock => (<Stock {...stock} key={stock.symbol} />))}
        </Card.Group>
        <Button color='green' onClick={this.clickHandler}>Load More</Button>
      </Container>
    );
  }

}

export default Marketplace;
