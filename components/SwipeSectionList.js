import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { mainColor, productCategory, secondaryColor } from "../utils/helpers";

function SwipeSectionList({
  listData,
  deleteProduct,
  navigateToEditProduct,
  toggleProduct,
  toBuyView,
}) {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    deleteProduct(rowKey);
  };
  const goToEditProduct = (rowMap, product) => {
    closeRow(rowMap, product.key);
    navigateToEditProduct(product);
  };
  const onToggle = async (product) => {
    toggleProduct(product);
  };
  const onRowDidOpen = (rowKey) => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <View>
      <TouchableHighlight
        onPress={() => onToggle(data.item)}
        style={data.item.toBuy? styles.rowFront : [styles.rowFront, styles.notSelected]}
        underlayColor={"#AAA"}
      >
        <View style={styles.rowAlign}>
          {toBuyView ? (
            <MaterialCommunityIcons
              style={styles.rowIcon}
              name={
                data.item.checked
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={20}
              color={mainColor}
            />
          ) : (
            <MaterialCommunityIcons
              style={styles.rowIcon}
              name={
                data.item.toBuy
                  ? "cart-outline"
                  : "cart-off"
              }
              size={20}
              color={'grey'}
            />
          )}

          <Text style={!data.item.toBuy ? {color: '#4d4c4c'}: {color: 'black'}}>
            {" "}
            {data.item.name}{" "}
            {data.item.quantity !== 0 && (
              <Text>
                {" "}
                ({data.item.quantity} {data.item.unit}){" "}
              </Text>
            )}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
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
    <View style={styles.sectionHeader}>
      <MaterialCommunityIcons
        style={styles.sectionIcon}
        name={productCategory[section.title].picture}
        size={20}
      />
      <Text style={styles.sectionText}>{section.title}</Text>
    </View>
  );

  return (
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
  );
}

export default SwipeSectionList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    marginLeft: 10,
  },
  sectionText: {
    color: secondaryColor,
    fontWeight: "bold",
  },
  sectionIcon: {
    marginRight: 7,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowAlign: {
    flexDirection: "row",
  },
  rowFront: {
    paddingLeft: 20,
    backgroundColor: "#F1F1F0",
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  notSelected:{
    backgroundColor: "#c9c7c7",
  },
  rowIcon: {
    marginRight: 12,
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
    backgroundColor: mainColor,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
