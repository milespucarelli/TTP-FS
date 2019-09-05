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
        stock.symbol.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
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
    // fetch('https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_3b067f6bb3e243388641ac4995837a75&filter=symbol,name')
    //   .then(res => res.json())
    //   .then(stocks => {
    //     console.log('first response', stocks)
    //     fetch(`https://api.iextrading.com/1.0/tops/last`)
    //       .then(res => res.json())
    //       .then(data => {
    //         console.log('second response',data)
    //         let sortedData = data.sort((a,b) => a.symbol.localeCompare(b.symbol))
    //         let sortedStocks = stocks.sort((a,b) => a.symbol.localeCompare(b.symbol))
    //         sortedStocks = sortedStocks.map((stock, index) => ({symbol: stock.symbol, name: stock.name, price: sortedData[index].price}))
    //         this.setState({stocks: sortedStocks, filteredStocks: sortedStocks, loadedStocks: sortedStocks.slice(0, 120)})
    //       })
    //   })
    fetch(`https://api.iextrading.com/1.0/tops/last`)
      .then(res => res.json())
      .then(data => {
        let stocks = data.sort((a,b) => a.symbol.localeCompare(b.symbol))
        this.setState({stocks: stocks, filteredStocks: stocks, loadedStocks: stocks.slice(0, 120)})
      })
  }

  render() {
    let {searchTerm, upperRange, filteredStocks} = this.state
    return (
      <Container>
        <h1 className='page-banner'>Marketplace</h1>
        <div id='searchbar'>
          <Input size='massive' icon='search' placeholder='Search...' value={searchTerm} onChange={this.searchHandler}/>
        </div>
        <Card.Group itemsPerRow={4}>
          {this.state.loadedStocks.map((stock, index) => (<Stock {...stock} {...this.props} key={index} />))}
        </Card.Group>
        {upperRange < filteredStocks.length ? <Button id='loadmore' onClick={this.clickHandler}>Load More</Button> : null}
      </Container>
    );
  }

}

export default Marketplace;
