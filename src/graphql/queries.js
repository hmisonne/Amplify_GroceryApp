/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodItem = /* GraphQL */ `
  query GetFoodItem($id: ID!) {
    getFoodItem(id: $id) {
      id
      name
      checked
      unit
      amount
      type
      createdAt
      updatedAt
    }
  }
`;
export const listFoodItems = /* GraphQL */ `
  query ListFoodItems(
    $filter: ModelFoodItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        checked
        unit
        amount
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
