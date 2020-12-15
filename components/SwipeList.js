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
import { secondaryColor } from "../utils/helpers";
import PropTypes from "prop-types";

function SwipeList({
  listData,
  deleteAction,
  navigateToEdit,
  onPressAction
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
    onPressAction(element)
  }
  const onRowDidOpen = (rowKey) => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <View>
      <TouchableHighlight
        onPress={() => onPress(data.item)}
        style={ styles.rowFront }
        underlayColor={"#AAA"}
      >
        <View style={styles.rowAlign}>
          <Text style={styles.textItem}>
            {data.item.name}
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
      renderItem={renderItem}
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
    backgroundColor: "#F1F1F0",
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
});


SwipeList.propTypes = {
  listData: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired,
  navigateToEdit: PropTypes.func.isRequired,
  onPressAction: PropTypes.func.isRequired,
};