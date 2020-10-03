import 'react-native-gesture-handler';
import React from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import DATA from './data.js'
import store from './src/redux/store';
import { Provider } from 'react-redux';
import NewProductForm from './screens/NewProductForm'
import ProductList from './screens/ProductList'
import ProductCategory from './screens/ProductCategory'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

Amplify.configure(config)

const ProductStack = createStackNavigator();


const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductStack.Navigator>
        <ProductStack.Screen 
            name="ProductCategory" 
            component={ProductCategory} />
          <ProductStack.Screen
            name="ProductList"
            component={ProductList}/>
          <ProductStack.Screen 
            name="AddProduct" 
            component={NewProductForm} />
        </ProductStack.Navigator>
      </NavigationContainer>
    </Provider>
      
  )
  
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})

export default withAuthenticator(App)