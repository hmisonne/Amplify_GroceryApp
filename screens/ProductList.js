import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB, Provider } from "react-native-paper";
import { connect, useDispatch } from "react-redux";
import { DataStore } from "aws-amplify";

import {
  formatSectionListData,
  lightGreyBackground,
  mainColor,
  onShare,
} from "../utils/helpers";
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

function ProductList({
  navigation,
  route,
  allProducts,
  productsToBuy,
  numOfProducts,
}) {
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
      message: "Uncheck All Items from Cart?",
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "checked")),
    },
    {
      icon: "cart-off",
      title: "Empty Cart",
      validationNeeded: true,
      message: "Remove All Items from Cart?",
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "toBuy")),
    },
    {
      icon: "delete-variant",
      title: "Delete All",
      message: "Delete All Items from Cart and History?",
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

        <View
          style={{
            height: 80,
            backgroundColor: lightGreyBackground,
            borderTopWidth: 1,
            borderTopColor: "#DCDCDC",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Text>
              {numOfProducts.toBuy
                ? `Items in cart: ${numOfProducts.inCart}/${numOfProducts.toBuy}`
                : ""}
            </Text>
          </View>

          <FAB
            icon="plus"
            style={{
              backgroundColor: mainColor,
              alignSelf: "center",
            }}
            onPress={() =>
              navigation.push("AddProduct", {
                groceryListID: groceryListID,
              })
            }
          />
        </View>
      </View>
    </Provider>
  );
}

function mapStateToProps(state) {
  const { products } = state;
  let currListCategories = formatSectionListData(products);
  // Format products for MY CART product view
  const filteredProducts = products.filter((product) => product.toBuy === true);
  let currListCategoriesFiltered = formatSectionListData(filteredProducts);
  const numOfProductsToBuy = products.filter(
    (product) => product.toBuy === true
  );
  const numOfProductsInCart = numOfProductsToBuy.filter(
    (product) => product.checked === true
  );
  return {
    numOfProducts: {
      toBuy: numOfProductsToBuy.length,
      inCart: numOfProductsInCart.length,
    },
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
