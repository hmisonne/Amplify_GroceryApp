import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
import { deleteProduct, toggleProduct } from "../src/redux/actions/product";
import { DataStore } from "@aws-amplify/datastore";
import { Product } from "../src/models";
import store from "../src/redux/store";
import RoundButton from "../components/RoundButton";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const { products } = store.getState();
  const { category, groceryListID } = props.route.params;
  const productsByCat = products.filter(
    (product) => product.category === category
  );

  async function onToggle(id) {
    try {
      dispatch(toggleProduct(id));
      const original = await DataStore.query(Product, id);
      await DataStore.save(
        Product.copyOf(original, (updated) => {
          updated.checked = !original.checked;
        })
      );
    } catch (err) {
      console.log("error toggling product", err);
    }
  }

  async function removeProduct(id) {
    try {
      dispatch(deleteProduct(id));
      const todelete = await DataStore.query(Product, id);
      DataStore.delete(todelete);
    } catch (err) {
      console.log("error deleting product", err);
    }
  }
  function goToEditProduct(product){
    return props.navigation.push("AddProduct", { product });
  }

  return (
    <View style={styles.container}>
      {productsByCat.map((product, index) => (
        <View key={product.id ? product.id : index} style={styles.product}>
          <View style={styles.subContainer}>
            <Switch
              value={product.checked}
              onValueChange={() => onToggle(product.id)}
            />
            <TouchableOpacity style={styles.textAndQty} onPress={() => goToEditProduct(product)}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
              </View>
              <View>
                <Text style={styles.productName}>
                {product.quantity} {product.unit}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <RoundButton
            onPress={() => removeProduct(product.id)}
            name="minus-circle"
            color="red"
          />
        </View>
      ))}
    </View>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textAndQty:{
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  subContainer:{
    flex: 1,
    flexDirection: "row",
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  productName: { fontSize: 18 },
});
