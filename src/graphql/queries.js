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
        name
        checked
        unit
        quantity
        category
        groceryList {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      checked
      unit
      quantity
      category
      groceryList {
        id
        name
        owner {
          id
          name
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        description
        products {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
        name
        checked
        unit
        quantity
        category
        groceryList {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
        owner {
          id
          name
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        description
        products {
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
      owner {
        id
        name
        email
        grocerylists {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      description
      products {
        items {
          id
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
        owner {
          id
          name
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        description
        products {
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
        name
        email
        grocerylists {
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      grocerylists {
        items {
          id
          name
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
        grocerylists {
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
