import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, useDispatch } from "react-redux";
import { DataStore } from "aws-amplify";

import {
  createTwoButtonAlert,
  formatSectionListData,
  onShare,
  secondaryColor,
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
import Footer from "../components/Footer";
import RoundButton from "../components/RoundButton";
import SnackBar from "../components/SnackBar";


function ProductList({
  navigation,
  route,
  allProducts,
  productsToBuy,
  numOfProducts,
}) {
  const dispatch = useDispatch();
  const [toBuyView, setToBuyView] = useState(true);
  const [snackVisible, setSnackVisible] = React.useState(false);
  const onToggleSnackBar = (bool) => setSnackVisible(bool);
  const [snackContent, setSnackContent] = useState("");
  const onSetSnackContent = (content) =>
    setSnackContent(content); 
  function toggleToBuyView(bool) {
    return setToBuyView(bool);
  }

  const { groceryList } = route.params;
  const groceryListID = groceryList.id;

  const actionsMenuHistory = [
    {
      icon: "delete-variant",
      title: "Delete All",
      alertTitle: "Delete All Items?",
      message: "This action will wipe out all of your items",
      validationNeeded: true,
      onPress: (groceryList) =>
        dispatch(handleDeleteAllProducts(groceryList.id)),
    },
  ];
  const actionsMenu = [
    {
      icon: "checkbox-multiple-blank-circle-outline",
      title: "Uncheck All",
      validationNeeded: true,
      alertTitle: "Uncheck All Items from My List?",
      message: "All items on your list will appear as unchecked",
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "checked", true)),
    },
    {
      icon: "eraser",
      title: "Empty List",
      validationNeeded: true,
      alertTitle: "Remove All Items from My List?",
      message:
        "We've got you covered, your items will still be available in the History tab",
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "toBuy")),
    },
    {
      icon: "clipboard-check-outline",
      title: "I'm Done!",
      validationNeeded: true,
      alertTitle: "Are you done shopping?",
      message:
        "Don't worry, all of the unchecked items will stay in your list!",
      onPress: (groceryList) =>
        dispatch(handleToggleMultipleProducts(groceryList.id, "checked")),
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <RoundButton
              onPress={() =>
                onShare(`👋 ListBee: The grocery list "${groceryList.name}" is now accessible by using this List ID number: 
              ${groceryList.id}`)
              }
              name="account-plus"
              color={secondaryColor}
              style={{ marginRight: 20 }}
            />
            <MenuOptions
              actionsMenu={toBuyView ? actionsMenu : actionsMenuHistory}
              groceryList={groceryList}
            />
          </View>
        ),
      },
      []
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

  function doneShoppingWithValidation(groceryListID) {
    const message = `Don't worry, all of the unchecked items will stay in your list!`;
    const alertTitle = "Are you done shopping?";
    return createTwoButtonAlert(
      () => doneShopping(groceryListID),
      message,
      alertTitle
    );
  }
  function doneShopping(groceryListID) {
    return dispatch(handleToggleMultipleProducts(groceryListID, "checked"));
  }
  function deleteProduct(productID) {
    return dispatch(handleDeleteProduct(productID));
  }
  function navigateToEditProduct(product) {
    return navigation.push("AddProduct", {
      product,
      onToggleSnackBar,
      onSetSnackContent,
    });
  }
  async function toggleProduct(product) {
    return dispatch(handleToggleProduct(product));
  }
  async function toggleProductToBuy(product) {
    return dispatch(handleToggleProduct(product, "toBuy"));
  }

  return (
    <View style={styles.container}>
      <HeaderTab
        firstTabSelected={toBuyView}
        switchToSecondTab={toggleToBuyView}
      />
      <SwipeSectionList
        listData={toBuyView ? productsToBuy : allProducts}
        deleteAction={
          toBuyView
            ? (product) => {
              onSetSnackContent(`❗ ${product.name} removed from My List`)
              onToggleSnackBar(true)
              toggleProductToBuy(product)
            }
            : (product) => {
              onSetSnackContent(`❌ ${product.name} deleted permanently`)
              onToggleSnackBar(true)
              deleteProduct(product.id)
            }
        }
        navigateToEdit={(product) => navigateToEditProduct(product)}
        onPressAction={
          toBuyView
            ? (product) => toggleProduct(product)
            : (product) => {
                onSetSnackContent(
                  product.toBuy ? `❗ ${product.name} removed from My List` : `✅ ${product.name} added to My List`
                );
                toggleProductToBuy(product);
                onToggleSnackBar(true);
              }
        }
        toBuyView={toBuyView}
        groceryListID={groceryListID}
        fabAction={(groceryListID) => doneShoppingWithValidation(groceryListID)}
        itemsInCart={numOfProducts.inCart > 0}
      />
      <SnackBar
        visible={snackVisible}
        onDismissSnackBar={() => onToggleSnackBar(false)}
        snackContent={snackContent}
      />
      <Footer
        onPressAction={() =>
          navigation.push("AddProduct", {
            groceryListID,
            onToggleSnackBar,
            onSetSnackContent,
          })
        }
        numOfProducts={numOfProducts}
      />
    </View>
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
