import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { productCategory } from "../utils/helpers";
import { connect, useDispatch } from "react-redux";
import {
  handleDeleteProduct,
  handleLoadProducts,
  handleToggleProduct,
} from "../src/redux/actions/product";
import HeaderButtons from "../components/HeaderButtons";
import SwipeSectionList from "../components/SwipeSectionList";

function ProductList(props) {
  const dispatch = useDispatch();
  const [visibleProducts, setVisibleProducts] = useState(false);
  function toggleProducts(bool) {
    return setVisibleProducts(bool);
  }

  const groceryListID = props.route.params.groceryList.id;
  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
  }, []);
  const { listData } = props;

  function deleteProduct(productID) {
    dispatch(handleDeleteProduct(productID));
  }
  function navigateToEditProduct(product) {
    return props.navigation.push("AddProduct", { product });
  }
  async function toggleProduct(product) {
    return dispatch(handleToggleProduct(product));
  }

  return (
    <View style={styles.container}>
      <HeaderButtons
        visibleProducts={visibleProducts}
        toggleProducts={toggleProducts}
      />
      <SwipeSectionList
        listData={listData}
        deleteProduct={(productID) => deleteProduct(productID)}
        navigateToEditProduct={(product) => navigateToEditProduct(product)}
        toggleProduct={(product) => toggleProduct(product)}
      />
    </View>
  );
}

function mapStateToProps(state) {
  const { products } = state;
  const currCategories = new Set();
  products.forEach((product) => currCategories.add(product.category));
  let currListCategories = Array.from(currCategories)
    .map((cat) => ({
      title: cat,
      key: productCategory[cat].key,
      data: products
        .filter((product) => product.category === cat)
        .map((product) => ({ ...product, key: product.id })),
    }))
    .sort((a, b) => a.key - b.key);

  return { listData: currListCategories };
}
export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
