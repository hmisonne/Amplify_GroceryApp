import { productReducer, groceryListReducer } from '../reducers';
import { addProduct, deleteProduct, toggleProduct} from '../actions/product';
import { addGroceryList, loadGroceryLists} from '../actions/groceryList'

describe('product reducer', () => {
    const product = { 
        name: 'Berry', 
        type: 'Fruits',
        amount: 2,
        unit: 'ct',
        checked: false,
        id: 1
    };

    it('should add 1 product with a false checked status when using the addProduct function', () => {
        const newState = productReducer(undefined, addProduct(product))
        expect(newState.length).toEqual(1)
        expect(newState[0]).toEqual(product)
    });
    it('should change the checked status to true on toggleProduct', () => {
        const stateOne = productReducer(undefined, addProduct(product))
        const stateTwo = productReducer(stateOne, toggleProduct(1))
        expect(stateTwo[0].checked).toEqual(true)
    })
    it('should remove a Product from the state on deleteProduct', () => {
        const stateOne = productReducer(undefined, addProduct(product))
        const stateTwo = productReducer(stateOne, deleteProduct(1))
        expect(stateTwo.length).toEqual(stateOne.length -1)
    })
})

describe('list reducer', () => {
    const groceryList = { 
        name: 'New List', 
        id: 1
    };
    const groceryList2 = { 
        name: 'New List2', 
        id: 2
    };

    it('should add 1 grocery list', () => {
        const newState = groceryListReducer(undefined, addGroceryList(groceryList))
        expect(newState.length).toEqual(1)
        expect(newState[0]).toEqual(groceryList)
    });
    it('should load 2 grocery lists', () => {
        const newState = groceryListReducer(undefined, loadGroceryLists([groceryList,groceryList2]))
        expect(newState.length).toEqual(2)
    });
})