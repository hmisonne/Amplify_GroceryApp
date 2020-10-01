import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, Switch
} from 'react-native'

import { API, graphqlOperation } from 'aws-amplify'
import { createProduct, deleteProduct, updateProduct } from './src/graphql/mutations'
import { listProducts } from './src/graphql/queries'

import Amplify, { Hub } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import DATA from './data.js'
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Product } from './src/models'

Amplify.configure(config)

const initialState = { name: '', checked: false, unit: '', amount: 0, type: 'Fruits'}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts();
    const subscription = DataStore.observe(Product).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      fetchProducts();
    })
    return () => subscription.unsubscribe();
  }, [])

  async function fetchProducts() {
    try {
      const data = await DataStore.query(Product, Predicates.ALL);
      setProducts(data);
      console.log("products retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving products", error);
    }
    
  };

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function removeProduct(id) {
    try {
      setProducts(products.filter(food => food.id !== id))
      const todelete = await DataStore.query(Product, id);
      DataStore.delete(todelete);
    } catch (err) { console.log('error deleting product') }
  }

  async function addProduct() {
    try {
      const product = { ...formState }
      setProducts([...products, product])
      setFormState(initialState)

      // Convert Amount to Int
      product.amount = parseInt(product.amount, 10)
      await DataStore.save(
        new Product(product)
      )
      console.log("Product saved successfully!");
    } catch (err) {
      console.log('error creating food:', err)
    }
  }

  async function onToggle(product) {
    try {
      setProducts(products.map(product => 
        (product.id === product.id)
        ? {...product, checked: !product.checked}
        : product
      ))
      const original = await DataStore.query(Product, product.id);
      await DataStore.save(
        Product.copyOf(original, updated => {
          updated.checked = !original.checked;
        })
      );
    } catch (err) { console.log('error toggling product') }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.input}
        value={formState.name} 
        placeholder="Name"
      />
      <TextInput
        onChangeText={val => setInput('amount', val)}
        keyboardType="numeric"
        style={styles.input}
        value={`${formState.amount}`}
        placeholder="Amount"
      />
      <TextInput
        onChangeText={val => setInput('unit', val)}
        style={styles.input}
        value={formState.unit}
        placeholder="Unit"
      />
      <Button title="Create Food" onPress={addProduct} />
      {
        products.map((product, index) => (
          <View key={product.id ? product.id : index} style={styles.product}>
            <View style={styles.subContainer}>
              <Switch
                value={product.checked}
                onValueChange={() => onToggle(product)}
              />
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.productName}>{product.amount} {product.unit} {product.checked}</Text>
            </View>
            <Button title="Delete" onPress={() => removeProduct(product.id)} />
          </View>
        ))
      }
    </View>
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