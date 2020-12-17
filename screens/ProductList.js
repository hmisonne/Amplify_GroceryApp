import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Provider } from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import { DataStore } from "aws-amplify";

import { formatSectionListData, mainColor, onShare, productCategory } from "../utils/helpers";
import { Product } from "../src/models";
import {
  handleDeleteAllProducts,
  handleDeleteProduct,
  handleLoadProducts,
  handleToggleMultipleProducts,
  handleToggleProduct,
} from "../src/redux/actions/product";
import HeaderTab from "../components/HeaderTab";
import SwipeSectionList from "../components/SwipeSectionList";
import MenuOptions from "../components/MenuOptions";

function ProductList({ navigation, route, allProducts, productsToBuy }) {
  const dispatch = useDispatch();
  const [toBuyView, setToBuyView] = useState(true);
  function toggleToBuyView(bool) {
    return setToBuyView(bool);
  }

  const { groceryList } = route.params;
  const groceryListID = groceryList.id;

  const actionsMenu = [
    {
      icon: "share-variant",
      title: "Share",
      validationNeeded: false,
      onPress: (groceryList) =>
        onShare(`👋 ListBee: The grocery list "${groceryList.name}" is now accessible by using this reference: 
      ${groceryList.id}`),
      },
    {
      icon: "checkbox-multiple-blank-circle-outline",
      title: "Uncheck All",
      validationNeeded: true,
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "checked")),
    },
    {
      icon: "cart-off",
      title: "Empty Cart",
      validationNeeded: true,
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "toBuy")),
    },
    {
      icon: "delete-variant",
      title: "Delete All",
      validationNeeded: true,
      onPress: (groceryList) =>
        dispatch(handleDeleteAllProducts(groceryList.id)),
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: () => (
          <MenuOptions actionsMenu={actionsMenu} groceryList={groceryList} />
        ),
      },
      [navigation, actionsMenu, groceryList]
    );
  });

  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
    const subscription = DataStore.observe(Product).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      dispatch(handleLoadProducts(groceryListID));
    });

    return () => subscription.unsubscribe();
  }, []);

  function deleteProduct(productID) {
    dispatch(handleDeleteProduct(productID));
  }
  function navigateToEditProduct(product) {
    return navigation.push("AddProduct", { product });
  }
  async function toggleProduct(product) {
    return dispatch(handleToggleProduct(product));
  }
  async function toggleProductToBuy(product) {
    return dispatch(handleToggleProduct(product, "toBuy"));
  }

  return (
    <Provider>
      <View style={styles.container}>
        <HeaderTab
          firstTabSelected={toBuyView}
          switchToSecondTab={toggleToBuyView}
        />
        <SwipeSectionList
          listData={toBuyView ? productsToBuy : allProducts}
          deleteProduct={
            toBuyView
              ? (product) => toggleProductToBuy(product)
              : (product) => deleteProduct(product.id)
          }
          navigateToEditProduct={(product) => navigateToEditProduct(product)}
          toggleProduct={
            toBuyView
              ? (product) => toggleProduct(product)
              : (product) => toggleProductToBuy(product)
          }
          toBuyView={toBuyView}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          style={{
            backgroundColor: mainColor,
            position: "absolute",
            margin: 16,
            alignSelf: 'center',
            bottom: 0,
          }}
          onPress={() =>
            navigation.push("AddProduct", {
              groceryListID: groceryListID,
            })
          }
        />
      </View>
    </Provider>
  );
}

function mapStateToProps(state) {
  const { products } = state;
  let currListCategories = formatSectionListData(products)
  // Format products for MY CART product view
  const filteredProducts = products.filter((product) => product.toBuy === true);
  let currListCategoriesFiltered = formatSectionListData(filteredProducts)
  return {
    allProducts: currListCategories,
    productsToBuy: currListCategoriesFiltered,
  };
}
export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
