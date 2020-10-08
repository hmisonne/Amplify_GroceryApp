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
export const onUpdateGroceryList = /* GraphQL */ `
  subscription OnUpdateGroceryList {
    onUpdateGroceryList {
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
export const onDeleteGroceryList = /* GraphQL */ `
  subscription OnDeleteGroceryList {
    onDeleteGroceryList {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateGroceryShopper = /* GraphQL */ `
  subscription OnCreateGroceryShopper {
    onCreateGroceryShopper {
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
export const onUpdateGroceryShopper = /* GraphQL */ `
  subscription OnUpdateGroceryShopper {
    onUpdateGroceryShopper {
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
export const onDeleteGroceryShopper = /* GraphQL */ `
  subscription OnDeleteGroceryShopper {
    onDeleteGroceryShopper {
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
