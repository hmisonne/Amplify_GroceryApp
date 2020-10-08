/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      groceryListID
      name
      checked
      unit
      quantity
      category
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groceryListID
        name
        checked
        unit
        quantity
        category
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroceryList = /* GraphQL */ `
  query GetGroceryList($id: ID!) {
    getGroceryList(id: $id) {
      id
      name
      shoppers {
        items {
          id
          groceryListID
          shopperID
          createdAt
          updatedAt
        }
        nextToken
      }
      description
      products {
        items {
          id
          groceryListID
          name
          checked
          unit
          quantity
          category
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGroceryLists = /* GraphQL */ `
  query ListGroceryLists(
    $filter: ModelGroceryListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroceryLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        shoppers {
          nextToken
        }
        description
        products {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      userGroceries {
        items {
          id
          groceryListID
          shopperID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        userGroceries {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
