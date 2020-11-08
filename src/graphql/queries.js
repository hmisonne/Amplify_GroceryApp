/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        groceryListID
        name
        checked
        unit
        quantity
        category
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGroceryLists = /* GraphQL */ `
  query SyncGroceryLists(
    $filter: ModelGroceryListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGroceryLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        products {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getGroceryList = /* GraphQL */ `
  query GetGroceryList($id: ID!) {
    getGroceryList(id: $id) {
      id
      name
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
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          sub
          username
          groceryListID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
        description
        products {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sub
        username
        groceryListID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      sub
      username
      groceryListID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
        sub
        username
        groceryListID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
