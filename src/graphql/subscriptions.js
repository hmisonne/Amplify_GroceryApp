/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateGroceryList = /* GraphQL */ `
  subscription OnCreateGroceryList {
    onCreateGroceryList {
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
export const onUpdateGroceryList = /* GraphQL */ `
  subscription OnUpdateGroceryList {
    onUpdateGroceryList {
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
export const onDeleteGroceryList = /* GraphQL */ `
  subscription OnDeleteGroceryList {
    onDeleteGroceryList {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
