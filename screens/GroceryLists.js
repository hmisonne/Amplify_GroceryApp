import React, { useEffect } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { deleteGroceryList, loadGroceryLists } from '../src/redux/actions/groceryList'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, User } from '../src/models'
import store from '../src/redux/store';
import RoundButton from '../components/RoundButton'

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

    async function removeList(id) {
      try {
        dispatch(deleteGroceryList(id))
        const currentUser = await DataStore.query(User,  c => c.sub("eq", user.sub));
        
        await DataStore.save(
          User.copyOf(currentUser[0], updated => {
            updated.userGroceryListID = updated.userGroceryListID.filter(glistID => glistID !== id )
        }))
      } catch (err) { console.log('error deleting list', err)}
    }

    async function fetchLists() {
    try {
        const currentUser = await DataStore.query(User, c => c.sub("eq", user.sub));
        // const currentUser = await DataStore.query(User);
        const data = currentUser[0].userGroceryListID;
        let groceryListsPerUser = []
        if (data){
          for (let GroceryListID of data){
            const groceryList = await DataStore.query(GroceryList, GroceryListID);
            groceryListsPerUser.push(groceryList)
          }
        }
      dispatch(loadGroceryLists(groceryListsPerUser))
      console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
    
    };


  return (
    <View style={styles.container}>
    {
        groceryLists.map((glist, index) => (
          <View 
            style={styles.glist}
            key={glist.id ? glist.id : index} >
             <TouchableOpacity 
              style={styles.product}
              onPress={() => goToList(glist.id)}>
            <View style={styles.subContainer}>
              <Text style={styles.productName}>{glist.name}</Text>
            </View>
          </TouchableOpacity>
          <RoundButton 
            onPress={() => removeList(glist.id)}
            name="minuscircle" 
            color="red" 
          />
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
  glist: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})