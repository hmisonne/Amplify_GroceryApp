/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createGroceryList = /* GraphQL */ `
  mutation CreateGroceryList(
    $input: CreateGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    createGroceryList(input: $input, condition: $condition) {
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
export const updateGroceryList = /* GraphQL */ `
  mutation UpdateGroceryList(
    $input: UpdateGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    updateGroceryList(input: $input, condition: $condition) {
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
export const deleteGroceryList = /* GraphQL */ `
  mutation DeleteGroceryList(
    $input: DeleteGroceryListInput!
    $condition: ModelGroceryListConditionInput
  ) {
    deleteGroceryList(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createGroceryShopper = /* GraphQL */ `
  mutation CreateGroceryShopper(
    $input: CreateGroceryShopperInput!
    $condition: ModelGroceryShopperConditionInput
  ) {
    createGroceryShopper(input: $input, condition: $condition) {
      id
      groceryListID
      shopperID
      groceryList {
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
      shopper {
        id
        name
        email
        userGroceries {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGroceryShopper = /* GraphQL */ `
  mutation UpdateGroceryShopper(
    $input: UpdateGroceryShopperInput!
    $condition: ModelGroceryShopperConditionInput
  ) {
    updateGroceryShopper(input: $input, condition: $condition) {
      id
      groceryListID
      shopperID
      groceryList {
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
      shopper {
        id
        name
        email
        userGroceries {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroceryShopper = /* GraphQL */ `
  mutation DeleteGroceryShopper(
    $input: DeleteGroceryShopperInput!
    $condition: ModelGroceryShopperConditionInput
  ) {
    deleteGroceryShopper(input: $input, condition: $condition) {
      id
      groceryListID
      shopperID
      groceryList {
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
      shopper {
        id
        name
        email
        userGroceries {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
