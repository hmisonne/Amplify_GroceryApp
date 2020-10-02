import React, { useEffect } from 'react'
import {
    View, Text, StyleSheet, Button, Switch
  } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { deleteProduct, loadProducts, toggleProduct, resetProductList } from '../src/redux/actions'
import { DataStore } from "@aws-amplify/datastore";
import { Product } from '../src/models'
import store from '../src/redux/store';

const ProductList = (props) => {
    const dispatch = useDispatch()
    const { products } = store.getState()
    useEffect(() => {
        fetchProducts();
        // Turn off sync with Cloud
        // const subscription = DataStore.observe(Product).subscribe(msg => {
        //   console.log(msg.model, msg.opType, msg.element);
        //   fetchProducts();
        // })
        // return () => subscription.unsubscribe();
    }, [])

  async function fetchProducts() {
    try {
        console.log("cat", props.route.params.category)
      const data = await DataStore.query(Product, c => c.type("eq",props.route.params.category));
      dispatch(loadProducts(data))
      console.log("products retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving products", error);
    }
    
  };

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

  function goToNewProductScreen(){
    return props.navigation.push('AddProduct');
  }

  return (
    <View>
    <Button title="Add" onPress={() => goToNewProductScreen()} />
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
              <Text style={styles.productName}>{product.amount} {product.unit} {product.checked}</Text>
            </View>
            <Button title="Delete" onPress={() => removeProduct(product.id)} />
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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  productName: { fontSize: 18 }
})