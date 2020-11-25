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
      <HeaderButtons
        visibleProducts={visibleProducts}
        toggleProducts={toggleProducts}
      />
      <SwipeSectionList
        listData={visibleProducts? allProducts: productsToBuy}
        deleteProduct={(productID) => deleteProduct(productID)}
        navigateToEditProduct={(product) => navigateToEditProduct(product)}
        toggleProduct={(product) => toggleProduct(product)}
        toggleProductToBuy={(product) => toggleProductToBuy(product)}
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
