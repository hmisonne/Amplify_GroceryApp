import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, User, Product, GroceryShopper} from '../src/models'
import SubmitBtn from '../components/SubmitBtn'
import StyledTextInput from '../components/StyledTextInput'
import store from '../src/redux/store';
import { grey } from '../utils/colors'

const initialState = { 
  name: '',
  description: '',
}

const NewGroceryListForm = (props) => {
  const [formState, setFormState] = useState(initialState)
  const { user } = store.getState()
  
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  
  

  async function createListHandler() {    
    try {
      const groceryList = { ...formState }
      const groceryListSaved = await DataStore.save(
        new GroceryList({
            name: groceryList.name,
            description: groceryList.description,
        })
      )
      // Update User instance with new Grocery List
      // const currentUser = await DataStore.query(User,  c => c.sub("eq", user.attributes.sub));
      const currentUser = await DataStore.query(User);
      
      await DataStore.save(
        User.copyOf(currentUser[0], updated => {
          updated.userGroceryListID = updated.userGroceryListID ?
            [...updated.userGroceryListID, groceryListSaved.id]
          : [groceryListSaved.id]
      }))

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

const mapStateToProps = state => ({
    user: state.user,
  })

export default connect(mapStateToProps)(NewGroceryListForm)


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around', 
    padding: 20 
  },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  
})