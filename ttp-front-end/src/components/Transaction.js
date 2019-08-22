import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class Transaction extends Component {

  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Shares</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.transactions.map(transaction => (
                <Table.Row>
                  <Table.Cell>BUY</Table.Cell>
                  <Table.Cell>{transaction.ticker}</Table.Cell>
                  <Table.Cell>{transaction.share}</Table.Cell>
                  <Table.Cell>{transaction.price}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

}

export default Transaction;
