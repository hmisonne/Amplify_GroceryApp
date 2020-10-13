import React, { useEffect } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { loadGroceryLists} from '../src/redux/actions/groceryList'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, User } from '../src/models'
import store from '../src/redux/store';


const GroceryLists = (props) => {
    const dispatch = useDispatch()
    const { groceryLists, user } = store.getState()
    useEffect(() => {
        fetchLists();
        // Turn on sync with Cloud
        const subscription = DataStore.observe(GroceryList).subscribe(msg => {
        console.log('sync grocery list', msg.model, msg.opType, msg.element);
        fetchLists();
      })
      return () => subscription.unsubscribe();
    }, [])
    
    function goToList(groceryListID){
        return props.navigation.push('ProductCategory',{ groceryListID})
    }

    async function fetchLists() {
    try {
        // const currentUser = await DataStore.query(User, c => c.sub("eq", user.attributes.sub));
        // const currentUser = await DataStore.query(User);
        // const data = currentUser[0].userGroceryListID;
        // let groceryListsPerUser = []
        // for (let GroceryListID of data){
        //   const groceryList = await DataStore.query(GroceryList, GroceryListID);
        //   groceryListsPerUser.push(groceryList)
        // }
        const groceryListsPerUser = await DataStore.query(GroceryList);
        dispatch(loadGroceryLists(groceryListsPerUser))
      console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
    
    };


  return (
    <View style={styles.container}>
    {
        groceryLists.map((product, index) => (
          <TouchableOpacity 
            key={product.id ? product.id : index} 
            style={styles.product}
            onPress={() => goToList(product.id)}>
            <View style={styles.subContainer}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          </TouchableOpacity>
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