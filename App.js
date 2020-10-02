import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, Button, Switch
} from 'react-native'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import DATA from './data.js'
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Product } from './src/models'
import store from './src/redux/store';
import { Provider, useSelector, useReducer } from 'react-redux';
import NewProductForm from './screens/NewProductForm'
import ProductList from './screens/ProductList'
import { deleteProduct, loadProducts } from './src/redux/actions'
import reducers from './src/redux/reducers'

Amplify.configure(config)

const App = () => {
  // const [products, setProducts] = useState([])
  // const [products, dispatch] = useReducer(reducers);
  // const products = useSelector(state => state.products)

  // useEffect(() => {
    // dispatch(loadProducts(DATA))
  //   fetchProducts();
    // Turn off sync with Cloud
    // const subscription = DataStore.observe(Product).subscribe(msg => {
    //   console.log(msg.model, msg.opType, msg.element);
    //   fetchProducts();
    // })
    // return () => subscription.unsubscribe();
  // }, [])

  

  return (
    <Provider store={store}>
      <View style={styles.container}>
      <NewProductForm/>
      <ProductList/>
      </View>    
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