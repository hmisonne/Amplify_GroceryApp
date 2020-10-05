import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import reducers from '../src/redux/reducers';
import { addProduct } from '../src/redux/actions/product'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'
import {Picker} from '@react-native-community/picker';
import SubmitBtn from '../components/SubmitBtn'
import StyledTextInput from '../components/StyledTextInput'
import Stepper from '../components/Stepper'
import { grey } from '../utils/colors'

const initialState = { 
  name: '',
  checked: false,
  unit: 'ct', 
  quantity: 1, 
  category: '',
  productGroceryListId: '123'
}

const units = ['ct', 'lb', 'g', 'kg', 'L']

const NewProductForm = (props) => {
  initialState.category = props.route.params.category
  const [formState, setFormState] = useState(initialState)
  // const [state, dispatch] = useReducer(reducers);
  const dispatch = useDispatch()

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  
  function onIncrement(key) {
    const count = parseInt(formState[key], 10) + 1
    setFormState({ ...formState, [key]: count })
  }

  function onDecrement(key) {
    const count = parseInt(formState[key], 10) - 1
    setFormState({ ...formState, [key]: count })
  }

  async function addProductHandler() {    
    try {
      const product = { ...formState }
      // setProducts([...products, product])
      setFormState(initialState)

      // Convert Quantity to Int
      product.quantity = parseInt(product.quantity, 10)
      console.log('product', product)
      const productSaved = await DataStore.save(
        new Product(product)
      )
      console.log('product', productSaved)
      dispatch(addProduct(productSaved))
      console.log("Product saved successfully!");
    } catch (err) {
      console.log('error creating food:', err)
    }
  }


  return (
    <View style={styles.container}>
      <StyledTextInput
          onChangeText={val => setInput('name', val)}
          style={styles.input}
          value={formState.name} 
          placeholder="Name"
        />
        <View style={styles.product}>
          <Stepper
            onIncrement={() => onIncrement('quantity')} 
            onDecrement={() => onDecrement('quantity')} 
          />
          <StyledTextInput
          onChangeText={val => setInput('quantity', val)}
          keyboardType="numeric"
          style={styles.input}
          value={`${formState.quantity}`}
          placeholder="quantity"
          />
        </View>
        

        <Picker
          selectedValue={formState.unit}
          style={styles.picker}
          onValueChange={val => setInput('unit', val)}>
          <Picker.Item label={formState.unit} value={formState.unit} />
          {units.filter(unit => unit !== formState.unit).map(unit => (
            <Picker.Item label={unit} value={unit} key={unit} />
          ))}
          
        </Picker>
        <SubmitBtn title="Add to List" onPress={addProductHandler} />
      </View>
  )

}


export default NewProductForm


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around', 
    padding: 20 
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15 
  },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 },
  picker: {
    height: 40,
    borderColor: grey,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
},
})