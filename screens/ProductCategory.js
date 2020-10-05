import React from 'react';
import { Button, Text, View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';

import { Icon, InlineIcon } from '@iconify/react';
import carrotIcon from '@iconify/icons-mdi/carrot';
import fruitCherries from '@iconify/icons-mdi/fruit-cherries';
import barleyIcon from '@iconify/icons-mdi/barley';
import foodDrumstick from '@iconify/icons-mdi/food-drumstick';
import cupIcon from '@iconify/icons-mdi/cup';
import muffinIcon from '@iconify/icons-mdi/muffin';
import { grey } from '../utils/colors';

  const categories= [
      {name:'Fruits', img: fruitCherries},
      {name:'Veggies', img: carrotIcon},
      {name:'Dairy', img: cupIcon},
      {name:'Grains', img: barleyIcon},
      {name:'Meat', img: foodDrumstick},
      {name:'Custom', img: muffinIcon},
  ]

const ProductCategory = (props) => {
    function goToProductList(category) {
        return props.navigation.push('ProductList',{category})
    }

    return(
    <View style={styles.container}>
        {categories.map((cat, index) => (
        <TouchableOpacity 
          onPress={() => goToProductList(cat.name)} 
          style={styles.vignetteItem}
          key={index}
          >
          <Icon 
            icon={cat.img} 
            width="7em"
            height="7em"
            color={grey}
            hAlign="center"
            />

          <View style={styles.text}
            > 
            <Text style={{fontSize:18}}> {cat.name.toUpperCase()} </Text>
          </View>
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
      alignItems: 'center',
      width: 170,
      height: 170,
      margin: 20,
    },
    button: {
      marginVertical: 10,
      margin: 20,
    },
    text: {
      textAlign: 'center',  
    },
    
  });