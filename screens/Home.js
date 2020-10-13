import React, { useState , useEffect} from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import SubmitBtn from '../components/SubmitBtn'
import { authentificateUser } from '../src/redux/actions/user'
import { Auth } from 'aws-amplify'
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from '../src/models'

const Home = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        identifyUser();
       // Turn on sync with Cloud
        const subscription = DataStore.observe(User).subscribe(msg => {
            console.log('sub user')
            console.log(msg.model, msg.opType, msg.element);
            identifyUser();
        })
        return () => subscription.unsubscribe();
    }, [])
  
    async function identifyUser() {
        try {
            const userInfo = await Auth.currentUserInfo()

            // let users = await DataStore.query(User, c => c.sub("eq", userInfo.attributes.sub));
            let users = await DataStore.query(User);
            if (users.length === 0){
                await DataStore.save(
                    new User({
                        id: userInfo.id,
                        name: userInfo.username,
                        email: userInfo.attributes.email,
                        // sub: userInfo.attributes.sub
                    })
                  )
            }
            
            dispatch(authentificateUser(userInfo))
            console.log("User info retrieved successfully!");
        } catch (error) {
            console.log("Error retrieving user info", error);
        }

    };

    function goToNewGroceryList() {
        return props.navigation.push('NewList')
    }

    function goToSavedGroceryList() {
        return props.navigation.push('GroceryLists')
    }

    return (
        <View style={styles.container}>
            <SubmitBtn 
                title='New List'
                onPress={goToNewGroceryList}
            />
            <SubmitBtn 
                title='Saved List(s)'
                onPress={goToSavedGroceryList}
            />
        </View>
    )

}


export default Home

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'space-around', 
      padding: 20 
    },
  })