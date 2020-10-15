import React, { useEffect, useState } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity, Button
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { loadGroceryLists} from '../src/redux/actions/groceryList'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, User } from '../src/models'
import store from '../src/redux/store';


const AllGroceryLists = (props) => {
    const [groceryLists, setGroceryLists] = useState([]);
    const { user } = store.getState()

    useEffect(() => {
        fetchLists();
        // Turn on sync with Cloud
        const subscription = DataStore.observe(GroceryList).subscribe(msg => {
        console.log('sync grocery list', msg.model, msg.opType, msg.element);
        fetchLists();
      })
      return () => subscription.unsubscribe();
    }, [])
    

    async function addListToUser(groceryListID){
        const currentUser = await DataStore.query(User,  c => c.sub("eq", user.sub));
      
        await DataStore.save(
            User.copyOf(currentUser[0], updated => {
            updated.userGroceryListID = updated.userGroceryListID ?
                [...updated.userGroceryListID, groceryListID]
            : [groceryListID]
        }))
    }

    async function fetchLists() {
        try {
            const groceryLists = await DataStore.query(GroceryList);
            setGroceryLists(groceryLists)
            console.log("grocery lists retrieved successfully!");
        } catch (error) {
            console.log("Error retrieving grocery lists", error);
        }

    };


  return (
    <View style={styles.container}>
    {
        groceryLists.map((list, index) => (
            <View 
                key={list.id ? list.id : index}
                style={styles.list}>
              <Text style={styles.listName}>{list.name}</Text>
              <Button 
                title='Add'
                onPress={() => addListToUser(list.id)} />
            </View>
        ))
      }
      </View>
  )

}

const mapStateToProps = state => ({
    user: state.user,
  })

export default connect(mapStateToProps)(AllGroceryLists)

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  list: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15  },
  listName: {  fontSize: 18  },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
})