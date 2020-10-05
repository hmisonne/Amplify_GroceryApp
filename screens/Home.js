import React, { useState } from 'react'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'

import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'

import SubmitBtn from '../components/SubmitBtn'

import { grey } from '../utils/colors'



const Home = (props) => {
 
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