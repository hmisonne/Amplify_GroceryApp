import 'react-native-gesture-handler';
import React from 'react'
import {
  View, StyleSheet, Button, TouchableOpacity
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
import NewGroceryListForm from './screens/NewGroceryListForm'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

Amplify.configure({...config,
  Analytics: { 
    disabled: true
  }
})

const ProductStack = createStackNavigator();


const App = () => {
  function goToNewProductScreen (props) {
    props.navigation.push('AddProduct',{category: props.route.params.category})
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductStack.Navigator>
          <ProductStack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Home' }}/>
          <ProductStack.Screen 
            name="ProductCategory" 
            component={ProductCategory} 
            options={{ title: 'My Grocery List' }}/>
          <ProductStack.Screen 
            name="NewList" 
            component={NewGroceryListForm} 
            options={{ title: 'My New List' }}/>
          <ProductStack.Screen 
            name="ProductList" 
            component={ProductList} 
            options={(props) => ({
              title: props.route.params.category,
              headerRight: () => (
                <TouchableOpacity 
                  style={{marginRight: 20}}
                  onPress={() => goToNewProductScreen(props)}>
                  <AntDesign 
                    name="pluscircle" 
                    size={24} 
                    color="green" />
                  </TouchableOpacity>
                ),
              })}
            />
          <ProductStack.Screen 
            name="AddProduct" 
            component={NewProductForm} 
            options={(props) => ({
              title: `Add New ${props.route.params.category}`,
              })}/>
        </ProductStack.Navigator>
      </NavigationContainer>
    </Provider>
      
  )
  
}

export default withAuthenticator(App)