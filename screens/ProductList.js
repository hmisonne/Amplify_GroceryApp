import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { connect, useDispatch } from "react-redux";
import { deleteProduct, toggleProduct } from "../src/redux/actions/product";
import { DataStore } from "@aws-amplify/datastore";
import { Product, GroceryList } from "../src/models";
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
      const newProduct = await DataStore.save(
        Product.copyOf(original, (updated) => {
          updated.checked = !original.checked;
        })
      );

      // Update GroceryList
      const originalGroceryList = await DataStore.query(
        GroceryList,
        groceryListID
      );
      await DataStore.save(
        GroceryList.copyOf(originalGroceryList, (updated) => {
          updated.products = updated.products.map((product) =>
            product.id === id ? newProduct : product
          );
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

  return (
    <View style={styles.container}>
      {productsByCat.map((product, index) => (
        <View key={product.id ? product.id : index} style={styles.product}>
          <View style={styles.subContainer}>
            <Switch
              value={product.checked}
              onValueChange={() => onToggle(product.id)}
            />
            <Text style={styles.productName}>{product.name}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.productName}>
              {product.quantity} {product.unit} {product.checked}
            </Text>
          </View>
          <RoundButton
            onPress={() => removeProduct(product.id)}
            name="minuscircle"
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
  subContainer: {
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
