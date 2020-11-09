import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { blue, categoryPictures } from "../utils/helpers";
import { connect, useDispatch } from "react-redux";
import { handleDeleteProduct, handleLoadProducts } from "../src/redux/actions/product";

function SwipeSectionList(props) {
  const dispatch = useDispatch();
  const groceryListID = props.route.params.groceryList.id;
  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
  }, []);
  const { listData } = props;

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    dispatch(handleDeleteProduct(rowKey));
  };
  const goToEditProduct = (rowMap, product) => {
    closeRow(rowMap, product.key);
    return props.navigation.push("AddProduct", { product });
  }

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={styles.rowAlign}>
        <MaterialCommunityIcons 
        name={data.item.checked ? 
          "checkbox-marked-circle"
          : "checkbox-blank-circle-outline"} size={20} color={blue} />
        <Text> {data.item.name} </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => goToEditProduct(rowMap, data.item)}
      >
        <MaterialCommunityIcons name="pencil" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <MaterialCommunityIcons name="delete-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionText}>
      <MaterialCommunityIcons
        name={categoryPictures[section.title]}
        size={20}
      />
      {section.title}
    </Text>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        useSectionList
        sections={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        renderSectionHeader={renderSectionHeader}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
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
    data: products
      .filter((product) => product.category === cat)
      .map((product) => ({ ...product, key: product.id })),
  }));

  return { listData: currListCategories };
}
export default connect(mapStateToProps)(SwipeSectionList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  sectionText: {
    color: blue,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowAlign:{
    flexDirection: 'row'
  },
  rowFront: {
    alignItems: "flex-start",
    paddingLeft: 20,
    backgroundColor: "#F8F8FF",
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#F8F8FF",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
