/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createGroceryList = /* GraphQL */ `
  mutation CreateGroceryList(
    $input: CreateGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    createGroceryList(input: $input, condition: $condition) {
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
export const updateGroceryList = /* GraphQL */ `
  mutation UpdateGroceryList(
    $input: UpdateGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    updateGroceryList(input: $input, condition: $condition) {
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
export const deleteGroceryList = /* GraphQL */ `
  mutation DeleteGroceryList(
    $input: DeleteGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    deleteGroceryList(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
