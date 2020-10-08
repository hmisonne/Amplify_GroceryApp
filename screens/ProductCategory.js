import React, {useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { connect, useDispatch } from 'react-redux'
import { loadProducts } from '../src/redux/actions/product'
import store from '../src/redux/store';
import { grey } from '../utils/colors';
import { GroceryList } from '../src/models';
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'

  const categories= [
    {name:'Fruits', img: "food-apple"},
    {name:'Veggies', img: "leaf"},
    {name:'Dairy', img: "cup"},
    {name:'Meat', img: "cow"},
    {name:'Frozen', img: "cube-outline"},
    {name:'Baking/Snacks', img: "muffin"},
    {name:'Drinks', img: "glass-cocktail"},
    {name:'Condiments', img: "food-variant"},
]

const ProductCategory = (props) => {
  const dispatch = useDispatch()
  const { groceryListID } = props.route.params
  const { products} = store.getState()
  useEffect(() => {
      fetchProducts();
      // Turn off sync with Cloud
      const subscription = DataStore.observe(Product).subscribe(msg => {
        console.log('sub product')
        console.log(msg.model, msg.opType, msg.element);
        fetchProducts();
      })
      return () => subscription.unsubscribe();
  }, [])



async function fetchProducts() {
  try {
    const data = await DataStore.query(GroceryList, groceryListID);
    data.products? 
    dispatch(loadProducts(data.products))
    : dispatch(loadProducts([]))
    console.log("products retrieved successfully!");
  } catch (error) {
    console.log("Error retrieving products", error);
  }
  
};

  function goToProductList(category) {
      return props.navigation.push('ProductList',{category, groceryListID})
    }
    
    return(
    <View style={styles.container}>
        {categories.map((cat, index) => (
        <TouchableOpacity 
          onPress={() => goToProductList(cat.name)} 
          style={styles.vignetteItem}
          key={index}
          >
          <MaterialCommunityIcons 
            name={cat.img} 
            size={100} 
            color={grey} />

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

const mapStateToProps = state => ({
  products: state.products,
})

export default connect(mapStateToProps)(ProductCategory)


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
      width: 150,
      height: 150,
      margin: 10,
    },
    button: {
      marginVertical: 10,
      margin: 20,
    },
    text: {
      textAlign: 'center',  
    },
    
  });

  // import { Icon } from '@iconify/react';
// import carrotIcon from '@iconify/icons-mdi/carrot';
// import fruitCherries from '@iconify/icons-mdi/fruit-cherries';
// import barleyIcon from '@iconify/icons-mdi/barley';
// import foodDrumstick from '@iconify/icons-mdi/food-drumstick';
// import cupIcon from '@iconify/icons-mdi/cup';
// import muffinIcon from '@iconify/icons-mdi/muffin';
// import glassCocktail from '@iconify/icons-mdi/glass-cocktail';
// import shakerIcon from '@iconify/icons-mdi/shaker';
// import cubeOutline from '@iconify/icons-mdi/cube-outline';
  // const categories= [
  //     {name:'Fruits', img: fruitCherries},
  //     {name:'Veggies', img: carrotIcon},
  //     {name:'Dairy', img: cupIcon},
  //     {name:'Grains', img: barleyIcon},
  //     {name:'Meat', img: foodDrumstick},
  //     {name:'Frozen', img: cubeOutline},
  //     {name:'Baking/Snacks', img: muffinIcon},
  //     {name:'Drinks', img: glassCocktail},
  //     {name:'Condiments', img: shakerIcon},
  // ]
  // <Icon 
  // icon={cat.img} 
  // width="7em"
  // height="7em"
  // color={grey}
  // />