import React, { Component } from 'react';
import { Container, Input, Card, Button } from 'semantic-ui-react'
import Stock from './Stock'

class Marketplace extends Component {
  state = {
    stocks: [],
    filteredStocks: [],
    loadedStocks: [],
    upperRange: 120,
    searchTerm: ''
  }

  searchHandler = (e) => {
    if (e.target.value) {
      let filtered = this.state.stocks.filter(stock =>
        stock.name.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
      )
      this.setState({
        searchTerm: e.target.value,
        filteredStocks: filtered,
        loadedStocks: filtered.slice(0, 120),
        upperRange: 120
      })
    } else {
      this.setState({
        searchTerm: '',
        filteredStocks: this.state.stocks,
        loadedStocks: this.state.stocks.slice(0, 120),
        upperRange: 120
      })
    }
  }

  clickHandler = () => {
    if (this.state.upperRange + 120 <= this.state.stocks.length) {
      this.setState({
        loadedStocks: this.state.filteredStocks.slice(0, this.state.upperRange + 120),
        upperRange: this.state.upperRange + 120
      })
    } else {
      this.setState({
        loadedStocks: this.state.filteredStocks.slice(0, this.state.filteredStocks.length),
        upperRange: this.state.filteredStocks.length
      })
    }
  }

  componentDidMount() {
    fetch('https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_3b067f6bb3e243388641ac4995837a75&filter=symbol,name')
      .then(res => res.json())
      .then(data => this.setState({stocks: data, loadedStocks: data.slice(0, 120)}))
  }

  render() {
    let {searchTerm, upperRange, filteredStocks} = this.state
    return (
      <div>
        <Container>
          <Input size='massive' icon='search' placeholder='Search...' value={searchTerm} onChange={this.searchHandler}/>
          <Card.Group itemsPerRow={4}>
            {this.state.loadedStocks.map(stock => (<Stock {...stock} {...this.props} key={stock.symbol} />))}
          </Card.Group>
          {upperRange < filteredStocks.length ? <Button color='green' onClick={this.clickHandler}>Load More</Button> : null}
        </Container>
      </div>
    );
  }

}

export default Marketplace;
