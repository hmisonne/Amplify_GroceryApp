import React, { useState , useEffect} from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'

import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'

import SubmitBtn from '../components/SubmitBtn'
import { authentificateUser } from '../src/redux/actions/user'
import { grey } from '../utils/colors'
import { Auth } from 'aws-amplify'


const Home = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        identifyUser();
        // Turn off sync with Cloud
        // const subscription = DataStore.observe(Product).subscribe(msg => {
        //   console.log(msg.model, msg.opType, msg.element);
        //   fetchProducts();
        // })
        // return () => subscription.unsubscribe();
    }, [])
  
    async function identifyUser() {
        try {
            const userInfo = await Auth.currentUserInfo()
            dispatch(authentificateUser(userInfo))
            console.log("User info retrieved successfully!");
        } catch (error) {
            console.log("Error retrieving user info", error);
        }

    };
    function goToProductList() {
        return props.navigation.push('ProductCategory')
    }

    return (
        <View style={styles.container}>
            <SubmitBtn 
                title='New List'
                onPress={goToProductList}
            />
            <SubmitBtn 
                title='Saved List(s)'
                onPress={goToProductList}
            />
            <SubmitBtn 
                title='Add List'
                onPress={goToProductList}
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