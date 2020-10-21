import { productReducer, groceryListReducer, userReducer } from '../reducers';
import { addProduct, deleteProduct, toggleProduct, loadProducts, filterProductsbyCat, updateProduct} from '../actions/product';
import { loadGroceryLists, deleteGroceryList } from '../actions/groceryList'
import { authentificateUser} from '../actions/user'

describe('product reducer', () => {
    const product = { 
        name: 'Berry', 
        category: 'Fruits',
        value: 2,
        unit: 'ct',
        checked: false,
        id: '1'
    };
    const product2 = { 
        name: 'Chicken', 
        category: 'Meat',
        value: 1,
        unit: 'ct',
        checked: false,
        id: '2'
    };
    const product3 = { 
        name: 'Turkey patty', 
        category: 'Meat',
        value: 2,
        unit: 'ct',
        checked: false,
        id: '3'
    };

    it('should add 1 product with a false checked status when using the addProduct function', () => {
        const newState = productReducer(undefined, addProduct(product))
        expect(newState.length).toEqual(1)
        expect(newState[0]).toEqual(product)
    });
    it('should change the checked status to true on toggleProduct', () => {
        const stateOne = productReducer(undefined, addProduct(product))
        const stateTwo = productReducer(stateOne, toggleProduct('1'))
        expect(stateTwo[0].checked).toEqual(true)
    })
    it('should remove a Product from the state on deleteProduct', () => {
        const stateOne = productReducer(undefined, addProduct(product))
        const stateTwo = productReducer(stateOne, deleteProduct('1'))
        expect(stateTwo.length).toEqual(stateOne.length -1)
    })
    it('should load multiple products', () => {
        const newState = productReducer(undefined, loadProducts([product, product2]))
        expect(newState.length).toEqual(2)
        expect(newState[0]).toEqual(product)
    })
    it('should filter products by category', () => {
        const stateOne = productReducer(undefined, loadProducts([product, product2, product3]))
        const stateTwo = productReducer(stateOne, filterProductsbyCat('Meat'))
        const stateThree = productReducer(stateOne, filterProductsbyCat('Fruits'))
        expect(stateTwo.length).toEqual(2)
        expect(stateTwo[0].category).toEqual('Meat')
        expect(stateTwo[1].category).toEqual('Meat')
        expect(stateThree.length).toEqual(1)
        expect(stateThree[0].category).toEqual('Fruits')
    })
    it('should update a Product', () => {
        const updatedProduct = { 
            name: 'Berries', 
            category: 'Fruits',
            value: 20,
            unit: 'lb',
            checked: false,
            id: '1'
        };
        const stateOne = productReducer(undefined, loadProducts([product, product2, product3]))
        const stateTwo = productReducer(stateOne, updateProduct(updatedProduct))
        expect(stateTwo.filter(product => product.id === '1')[0]).toEqual(updatedProduct)
    })
})

describe('list reducer', () => {
    const groceryList = { 
        name: 'New List', 
        id: '1'
    };
    const groceryList2 = { 
        name: 'New List2', 
        id: '2'
    };

    it('should load 2 grocery lists', () => {
        const newState = groceryListReducer(undefined, loadGroceryLists([groceryList,groceryList2]))
        expect(newState.length).toEqual(2)
    });
    it('should remove a grocery lists', () => {
        const stateOne = groceryListReducer(undefined, loadGroceryLists([groceryList,groceryList2]))
        const stateTwo = groceryListReducer(stateOne, deleteGroceryList('1'))
        expect(stateTwo.length).toEqual(stateOne.length -1)
        expect(stateTwo[0].id).toEqual('2')
    });
})

describe('user reducer', () => {
    const user = { 
        sub: '012350', 
        id: '1'
    };

    it('should add the authed user to the state', () => {
        const newState = userReducer(undefined, authentificateUser(user))
        expect(newState).toEqual(user)
    });
})