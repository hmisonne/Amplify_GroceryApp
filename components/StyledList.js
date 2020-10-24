import React, { Component } from "react";
import { Container, Header, Content, List, ListItem, Text } from "native-base";

export default class StyledList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.groceryList.map((glist) => (
              <ListItem>
                <Text>{glist.name}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}
{
  /* <Button title="Add" onPress={() => this.props.addGroceryListToUser(list.id, user, dispatch)} disabled={user.groceryLists.includes(list.id)} /> */
}
