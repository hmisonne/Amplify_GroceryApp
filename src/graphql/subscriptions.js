/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateGroceryList = /* GraphQL */ `
  subscription OnCreateGroceryList {
    onCreateGroceryList {
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
export const onUpdateGroceryList = /* GraphQL */ `
  subscription OnUpdateGroceryList {
    onUpdateGroceryList {
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
export const onDeleteGroceryList = /* GraphQL */ `
  subscription OnDeleteGroceryList {
    onDeleteGroceryList {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
