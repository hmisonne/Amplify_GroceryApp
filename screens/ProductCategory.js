import React from 'react';
import { Button, Text, View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux'



  const categories= [
      {name:'Fruits', img: require('../images/fruits.png'), key: 10},
      {name:'Veggies', img: require('../images/veggies.png'), key: 20},
      {name:'Dairy', img: require('../images/dairy.png'), key: 30},
      {name:'Grains', img: require('../images/grains.png'), key: 40},
      {name:'Meat', img: require('../images/meat.png'), key: 50},
      {name:'Custom', img: require('../images/custom.png'), key: 60},
  ]

const ProductCategory = (props) => {
    function goToProductList(category) {
        return props.navigation.push('ProductList',{category})
    }

    return(
    <View style={styles.container}>
        {categories.map((cat) => (
        <TouchableOpacity 
          onPress={() => goToProductList(cat.name)} 
          style={styles.vignetteItem}
          key={cat.key}
          >
          <ImageBackground
            style={styles.vignetteImage}
            source={cat.img}>
            <View style={styles.text}
              > 
              <Text style={{fontSize:18}}> {cat.name.toUpperCase()} </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        ))

        }
    </View>
    )
}

export default ProductCategory

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      flexDirection: 'row',
      padding: 8,
      flexWrap: 'wrap'
    },
    vignetteItem :{
        width: 170,
      height: 170,
      margin: 20
    },
    vignetteImage: {
      width: 170,
      height: 170
    },
    paragraph: {
      margin: 7,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
      marginVertical: 10,
      margin: 20,
    },
    text: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute', 
      width: '100%', 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center', 
  
    },
    
  });