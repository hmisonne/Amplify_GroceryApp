import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { productCategory } from "../utils/helpers";
import { connect, useDispatch } from "react-redux";
import {
  handleDeleteProduct,
  handleLoadProducts,
  handleToggleProduct,
} from "../src/redux/actions/product";
import HeaderTab from "../components/HeaderTab";
import SwipeSectionList from "../components/SwipeSectionList";

function ProductList(props) {
  const dispatch = useDispatch();
  const [toBuyView, setToBuyView] = useState(true);
  function toggleToBuyView(bool) {
    return setToBuyView(bool);
  }

  const groceryListID = props.route.params.groceryList.id;
  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
  }, []);
  const { allProducts, productsToBuy } = props;

  function deleteProduct(productID) {
    dispatch(handleDeleteProduct(productID));
  }
  function navigateToEditProduct(product) {
    return props.navigation.push("AddProduct", { product });
  }
  async function toggleProduct(product) {
    return dispatch(handleToggleProduct(product));
  }
  async function toggleProductToBuy(product) {
    return dispatch(handleToggleProduct(product, 'toBuy'));
  }

  return (
    <View style={styles.container}>
      <HeaderTab
        firstTabSelected={toBuyView}
        switchToSecondTab={toggleToBuyView}
      />
      <SwipeSectionList
        listData={toBuyView? productsToBuy : allProducts}
        deleteProduct={(productID) => deleteProduct(productID)}
        navigateToEditProduct={(product) => navigateToEditProduct(product)}
        toggleProduct={toBuyView? (product) => toggleProduct(product): (product) => toggleProductToBuy(product)}
        toBuyView={toBuyView}
      />
    </View>
  );
}

function mapStateToProps(state) {
  const { products } = state;
  const currCategories = new Set();
  products.forEach((product) => currCategories.add(product.category));
  let currListCategories = Array.from(currCategories).map((cat) => ({
    title: cat,
    key: productCategory[cat].key,
    data: products
      .filter((product) => product.category === cat)
      .map((product) => ({ ...product, key: product.id })),
  })).sort((a,b)=>a.key-b.key);

  const filteredProducts = products.filter((product) => product.toBuy === true)
  const filteredCurrCategories = new Set();
  filteredProducts.forEach((product) => filteredCurrCategories.add(product.category));
  let currListCategoriesFiltered = Array.from(filteredCurrCategories).map((cat) => ({
    title: cat,
    key: productCategory[cat].key,
    data: filteredProducts
      .filter((product) => product.category === cat)
      .map((product) => ({ ...product, key: product.id })),
  })).sort((a,b)=>a.key-b.key);

  return { allProducts: currListCategories, productsToBuy: currListCategoriesFiltered };
}
export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
