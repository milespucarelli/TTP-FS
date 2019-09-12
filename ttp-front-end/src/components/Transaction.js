import React, { Component } from 'react';
import { Table, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import TransactionRow from './TransactionRow'

class Transaction extends Component {

  render() {
    return this.props.user ?
      <Container>
        <h1 className='page-banner'>Transactions</h1>
        <Table celled striped style={{marginBottom: '10%'}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Shares</Table.HeaderCell>
              <Table.HeaderCell>Current Price</Table.HeaderCell>
              <Table.HeaderCell>Purchase Price</Table.HeaderCell>
              <Table.HeaderCell>Performance Since Purchase</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.transactions.map((transaction, index) => (
                <TransactionRow key={index} {...transaction} />
              ))}
          </Table.Body>
        </Table>
      </Container>:
      <Redirect to='/login'/>
  }

}

export default Transaction;
