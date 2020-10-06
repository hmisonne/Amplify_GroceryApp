import React, { useEffect } from 'react'
import {
    View, Text, StyleSheet, Button, Switch, TouchableOpacity
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { loadGroceryLists} from '../src/redux/actions/groceryList'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList } from '../src/models'
import store from '../src/redux/store';

import { AntDesign } from '@expo/vector-icons';

const GroceryLists = (props) => {
    const dispatch = useDispatch()
    const { groceryLists } = store.getState()
    useEffect(() => {
        fetchLists();
    }, [])
    
    
    
    async function fetchLists() {
    try {
        const data = await DataStore.query(GroceryList);
        dispatch(loadGroceryLists(data))
      console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
    
    };


  return (
    <View style={styles.container}>
    {
        groceryLists.map((product, index) => (
          <View key={product.id ? product.id : index} style={styles.product}>
            <View style={styles.subContainer}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          </View>
        ))
      }
      </View>
  )

}
const mapStateToProps = state => ({
    groceryLists: state.groceryLists,
  })

export default connect(mapStateToProps)(GroceryLists)


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})