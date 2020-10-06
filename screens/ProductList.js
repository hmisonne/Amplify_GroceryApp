import React, { useEffect } from 'react'
import {
    View, Text, StyleSheet, Switch, TouchableOpacity
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { deleteProduct, toggleProduct, filterProductsbyCat } from '../src/redux/actions/product'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'
import store from '../src/redux/store';

import { AntDesign } from '@expo/vector-icons';

const ProductList = (props) => {
    const dispatch = useDispatch()
    const { products } = store.getState()
    const {category} = props.route.params

    useEffect(() => {
      dispatch(filterProductsbyCat(category))
    }, [])
  

  async function onToggle(id) {
    try {
        dispatch(toggleProduct(id))
        const original = await DataStore.query(Product, id);
        await DataStore.save(
            Product.copyOf(original, updated => {
            updated.checked = !original.checked;
        })
        );
      
    } catch (err) { console.log('error toggling product') }
  }

  async function removeProduct(id) {
    try {
      dispatch(deleteProduct(id))
      const todelete = await DataStore.query(Product, id);
      DataStore.delete(todelete);
    } catch (err) { console.log('error deleting product') }
  }


  return (
    <View style={styles.container}>
    {
        products.map((product, index) => (
          <View key={product.id ? product.id : index} style={styles.product}>
            <View style={styles.subContainer}>
              <Switch
                value={product.checked}
                onValueChange={() => onToggle(product.id)}
              />
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.productName}>{product.quantity} {product.unit} {product.checked}</Text>
            </View>
            <TouchableOpacity onPress={() => removeProduct(product.id)}>
              <AntDesign 
                name="minuscircle" 
                size={24} 
                color="red" />
            </TouchableOpacity>
          </View>
        ))
      }
      </View>
  )

}
const mapStateToProps = state => ({
    products: state.products,
  })

export default connect(mapStateToProps)(ProductList)


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})