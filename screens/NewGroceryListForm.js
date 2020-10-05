import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { addGroceryList } from '../src/redux/actions/groceryList'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList } from '../src/models'
import SubmitBtn from '../components/SubmitBtn'
import StyledTextInput from '../components/StyledTextInput'

import { grey } from '../utils/colors'

const initialState = { 
  name: '',
  description: '', 
}

const NewGroceryListForm = (props) => {
  const [formState, setFormState] = useState(initialState)
  const dispatch = useDispatch()

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  

  async function createListHandler() {    
    try {
      const groceryList = { ...formState }
      setFormState(initialState)

      const groceryListSaved = await DataStore.save(
        new GroceryList(groceryList)
      )
      dispatch(addGroceryList(groceryListSaved))
      console.log("List saved successfully!");
    } catch (err) {
      console.log('error creating list:', err)
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
        <StyledTextInput
            onChangeText={val => setInput('description', val)}
            style={styles.input}
            value={formState.description} 
            placeholder="Description"
        />
    <   SubmitBtn title="Add to List" onPress={createListHandler} />
    </View>
  )

}



export default NewGroceryListForm


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around', 
    padding: 20 
  },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  
})