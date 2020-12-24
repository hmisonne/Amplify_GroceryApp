import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { lightGreyBackground, lightGrey, mainColor, secondaryColor } from "../utils/helpers";
import PropTypes from "prop-types";
import { Caption } from "react-native-paper";

function SwipeList({
  listData,
  deleteAction,
  navigateToEdit,
  onPressAction,
  toBuyView,
  productListView = false,
  user,
}) {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, element) => {
    closeRow(rowMap, element.key);
    deleteAction(element);
  };
  const goToEdit = (rowMap, element) => {
    closeRow(rowMap, element.key);
    navigateToEdit(element);
  };
  const onPress = (element) => {
    onPressAction(element);
  };
  const onRowDidOpen = (rowKey) => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = (data) => {
    const sharedWith =
      data.item.shoppers &&
      data.item.shoppers.filter((username) => username !== user.username);
    const sharedWithText = sharedWith && sharedWith.join(", ");
    return (
      <View>
        <TouchableHighlight
          onPress={() => onPress(data.item)}
          style={styles.rowFront}
          underlayColor={"#AAA"}
        >
          <View>
            <Text style={styles.textItem}>{data.item.name}</Text>
            {sharedWith && sharedWith.length > 0 && (
              <Caption> Shared with: {sharedWithText}</Caption>
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const renderProductItem = (data) => (
    <View>
      <TouchableHighlight
        onPress={() => onPress(data.item)}
        style={
          data.item.toBuy
            ? styles.rowFront
            : [styles.rowFront, styles.notSelected]
        }
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
              name={data.item.toBuy ? "cart-outline" : "cart-off"}
              size={20}
              color={!data.item.toBuy ? lightGrey : mainColor}
            />
          )}

          <Text
            style={[styles.textItem,{ color: !data.item.toBuy ? lightGrey : secondaryColor }]}
          >
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
        onPress={() => goToEdit(rowMap, data.item)}
      >
        <MaterialCommunityIcons name="pencil" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item)}
      >
        <MaterialCommunityIcons name="delete-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={listData}
      renderItem={productListView? renderProductItem : renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
}

export default SwipeList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowAlign: {
    flexDirection: "row",
  },
  rowFront: {
    paddingLeft: 20,
    backgroundColor: lightGreyBackground,
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  textItem: {
    fontSize: 20,
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
    backgroundColor: secondaryColor,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  notSelected: {
    backgroundColor: lightGreyBackground,
  },
  rowIcon: {
    marginRight: 12,
  },
});

SwipeList.propTypes = {
  listData: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired,
  navigateToEdit: PropTypes.func.isRequired,
  onPressAction: PropTypes.func.isRequired,
  toBuyView: PropTypes.bool,
  productListView: PropTypes.bool,
  user: PropTypes.object,
};
