import { API } from '../api'

jest.mock("aws-amplify", () => {
    return {
        Auth: '', 
    };
  });

jest.mock("../../src/models", () => {
  return true 
});

jest.mock("@aws-amplify/datastore", () => {
    return {
        DataStore: {
            save: () => 'save',
            delete: () => 'delete',
            query: () => [{
                id:'2',
                name:'test',
                groceryList: {id: '1'}
            },
            {
                id:'2',
                name:'test',
                groceryList: {id: '2'}
            }],
        } 
    };
  });


describe("fetchAllGroceryLists", () => {
  test('fetchAllGroceryLists should return all items from the datastore', () => {
    return API.fetchAllGroceryLists().then(data => {
        expect(data.length).toBe(2);
    });
  });
  test('fetchProductsByGroceryList should return the items that belongs to the specified grocery list from the datastore', () => {
    let id = '1'
    return API.fetchProductsByGroceryList(id).then(data => {
        expect(data.length).toBe(1);
        expect(data[0].groceryList.id).toBe(id);
    });
  });
});