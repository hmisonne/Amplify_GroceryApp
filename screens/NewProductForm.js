import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import reducers from '../src/redux/reducers';
import { addProduct } from '../src/redux/actions'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'
import {Picker} from '@react-native-community/picker';
import SubmitBtn from '../components/SubmitBtn'
import StyledTextInput from '../components/StyledTextInput'
import Stepper from '../components/Stepper'

const initialState = { 
  name: '',
  checked: false,
  unit: 'ct', 
  amount: 1, 
  type: ''
}

const units = ['ct', 'lb', 'g', 'kg', 'L']

const NewProductForm = (props) => {
  initialState.type = props.route.params.category
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

      // Convert Amount to Int
      product.amount = parseInt(product.amount, 10)
      const productSaved = await DataStore.save(
        new Product(product)
      )
      dispatch(addProduct(productSaved))
      console.log("Product saved successfully!");
    } catch (err) {
      console.log('error creating food:', err)
    }
  }


  return (
    <View>
      <StyledTextInput
          onChangeText={val => setInput('name', val)}
          style={styles.input}
          value={formState.name} 
          placeholder="Name"
        />
        <StyledTextInput
          onChangeText={val => setInput('amount', val)}
          keyboardType="numeric"
          style={styles.input}
          value={`${formState.amount}`}
          placeholder="Amount"
        />
        <Stepper
          onIncrement={() => onIncrement('amount')} 
          onDecrement={() => onDecrement('amount')} 
        />
        <Picker
          selectedValue={formState.unit}
          style={{height: 50, width: 100}}
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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})