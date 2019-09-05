import React, { Component } from 'react';
import { Segment, Card, Image, Grid, List} from 'semantic-ui-react';

class StockInfo extends Component {
  render() {
    let {companyName, symbol, industry, website, description, CEO, sector, employees} = this.props.stock
    let {image} = this.props
    return (
      <div>
          { Object.keys(this.props.stock).length === 0 ?
            <Segment>
                <h1>Click on your stocks' symbols below to see more info!</h1>
            </Segment>
            :
            <Card id='stock-info'>
              <Card.Content>
                <Image
                  className='stock-logo'
                  size='mini'
                  src={image}
                />
                <Card.Header><a href={website}>{companyName}</a></Card.Header>
                <Card.Meta>{symbol}</Card.Meta>
                <Card.Description>
                  {description ? description: 'Company Description unavailable.'}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
               <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column>
                    <List>
                      <List.Item>
                        <List.Header>Industry</List.Header>
                        {industry ? industry : 'n/a'}
                      </List.Item>
                      <List.Item>
                        <List.Header>Sector</List.Header>
                        {sector ? sector : 'n/a'}
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <List>
                      <List.Item>
                        <List.Header>CEO</List.Header>
                        {CEO ? CEO : 'n/a'}
                      </List.Item>
                      <List.Item>
                        <List.Header>Employees</List.Header>
                        {employees ? employees : 'n/a'}
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
               </Grid>
              </Card.Content>
            </Card>
          }
        </div>
    );
  }

}

export default StockInfo;
