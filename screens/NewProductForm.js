import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import reducers from '../src/redux/reducers';
import { addProduct } from '../src/redux/actions'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'

const initialState = { name: '', checked: false, unit: '', amount: 0, type: 'Fruits'}

const NewProductForm = () => {
  const [formState, setFormState] = useState(initialState)
  // const [state, dispatch] = useReducer(reducers);
  const dispatch = useDispatch()

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  
  async function addProductHandler() {
    const product = { ...formState }
    dispatch(addProduct(product))
    try {
      const product = { ...formState }
      // setProducts([...products, product])
      setFormState(initialState)

      // Convert Amount to Int
      // product.amount = parseInt(product.amount, 10)
      // await DataStore.save(
      //   new Product(product)
      // )
      console.log("Product saved successfully!");
    } catch (err) {
      console.log('error creating food:', err)
    }
  }


  return (
    <View>
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
        <Button title="Create Food" onPress={addProductHandler} />
      </View>
  )

}


export default NewProductForm


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