import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button, Switch
} from 'react-native'

import { API, graphqlOperation } from 'aws-amplify'
import { createFoodItem, deleteFoodItem, updateFoodItem } from './src/graphql/mutations'
import { listFoodItems } from './src/graphql/queries'

import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import DATA from './data.js'

Amplify.configure(config)

const initialState = { name: '', checked: false, unit: '', amount: 0, type: 'Fruits'}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [foodItems, setFoodItems] = useState([])

  useEffect(() => {
    fetchFoodItems()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchFoodItems() {
    setFoodItems(DATA)
    // try {
    //   const foodData = await API.graphql(graphqlOperation(listFoodItems))
    //   const foodItems = foodData.data.listFoodItems.items
    //   setFoodItems(foodItems)
    // } catch (err) { console.log('error fetching foodItems') }
  }

  async function removeFoodItem(id) {
    try {
      setFoodItems(foodItems.filter(food => food.id !== id))
      await API.graphql(graphqlOperation(deleteFoodItem, {input: { id }}))
    } catch (err) { console.log('error deleting foodItem') }
  }
  async function addFoodItem() {
    try {
      const foodItem = { ...formState }
      setFoodItems([...foodItems, foodItem])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createFoodItem, {input: foodItem}))
    } catch (err) {
      console.log('error creating food:', err)
    }
  }

  async function onToggle(foodItem) {
    try {
      const updatedFoodItem = {
        id: foodItem.id,
        name: foodItem.name,
        amount: foodItem.amount,
        unit: foodItem.unit,
        type: foodItem.type,
        checked : !foodItem.checked
      }
      setFoodItems(foodItems.map(food => 
        (food.id === foodItem.id)
        ? {...food, checked: !food.checked}
        : food
      ))
      await API.graphql(graphqlOperation(updateFoodItem, {input: updatedFoodItem}))
    } catch (err) { console.log('error toggling foodItem') }
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
      <Button title="Create Food" onPress={addFoodItem} />
      {
        foodItems.map((foodItem, index) => (
          <View key={foodItem.id ? foodItem.id : index} style={styles.foodItem}>
            <View style={styles.subContainer}>
              <Switch
                value={foodItem.checked}
                onValueChange={() => onToggle(foodItem)}
              />
              <Text style={styles.foodItemName}>{foodItem.name}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.foodItemName}>{foodItem.amount} {foodItem.unit} {foodItem.checked}</Text>
            </View>
            <Button title="Delete" onPress={() => removeFoodItem(foodItem.id)} />
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
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  foodItemName: { fontSize: 18 }
})

export default withAuthenticator(App)