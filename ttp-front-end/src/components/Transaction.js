import React, { Component } from 'react';
import { Table, Container } from 'semantic-ui-react'
import TransactionRow from './TransactionRow'

class Transaction extends Component {

  render() {
    return (
      <Container>
        <Table celled striped>
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
            {this.props.transactions.map(transaction => (
                <TransactionRow {...transaction} />
              ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }

}

export default Transaction;
