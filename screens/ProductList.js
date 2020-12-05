import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text, FAB, Provider } from 'react-native-paper';
import { mainColor, productCategory } from "../utils/helpers";
import { connect, useDispatch } from "react-redux";
import {
  handleDeleteProduct,
  handleLoadProducts,
  handleToggleProduct,
} from "../src/redux/actions/product";
import HeaderTab from "../components/HeaderTab";
import SwipeSectionList from "../components/SwipeSectionList";
import { DataStore } from "aws-amplify";
import { Product } from "../src/models";
import RoundButton from "../components/RoundButton";

function ProductList(props) {
  const dispatch = useDispatch();
  const [toBuyView, setToBuyView] = useState(true);
  function toggleToBuyView(bool) {
    return setToBuyView(bool);
  }
  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <RoundButton
          onPress={showModal}
          name="dots-vertical"
          style={{ marginRight: 20 }}
        />
      ),
  }, [props.navigation, setModalVisible]);
})

  
  const groceryListID = props.route.params.groceryList.id;
  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
    const subscription = DataStore.observe(Product).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      dispatch(handleLoadProducts(groceryListID));
    });

    return () => subscription.unsubscribe();
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
    <Provider>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    
    <View style={styles.container}>
      <HeaderTab
        firstTabSelected={toBuyView}
        switchToSecondTab={toggleToBuyView}
      />
      <SwipeSectionList
        listData={toBuyView? productsToBuy : allProducts}
        deleteProduct={toBuyView? 
          (product) => toggleProductToBuy(product)
          : (product) => deleteProduct(product.id)}
        navigateToEditProduct={(product) => navigateToEditProduct(product)}
        toggleProduct={toBuyView? (product) => toggleProduct(product): (product) => toggleProductToBuy(product)}
        toBuyView={toBuyView}
      />
       <FAB
        style={styles.fab}
        icon="plus"
        style={{
          backgroundColor: mainColor,
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,}
        }
        onPress={() => props.navigation.push("AddProduct", {
          groceryListID: groceryListID,
        })}
      />
    </View>
    </Provider>
  );
}

function mapStateToProps(state) {
  const { products } = state;
  // Format products for ALL product view
  const currCategories = new Set();
  products.forEach((product) => currCategories.add(product.category));
  let currListCategories = Array.from(currCategories).map((cat) => ({
    title: cat,
    key: productCategory[cat].key,
    data: products
      .filter((product) => product.category === cat)
      .map((product) => ({ ...product, key: product.id })),
  })).sort((a,b)=>a.key-b.key);
// Format products for TO BUY product view
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
