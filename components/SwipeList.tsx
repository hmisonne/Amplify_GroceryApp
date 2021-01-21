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
import { Caption } from "react-native-paper";
import { Product, User } from "../src/models";
import { RowData } from "../src/types/ListElements";


interface Props {
  listData: RowData[];
  deleteAction: (element: Product) => void;
  navigateToEdit: (element: Product) => void;
  onPressAction: (element: Product) => void;
  toBuyView?: boolean;
  productListView?: boolean;
  user?: User;
}


const SwipeList: React.FC<Props> = ({ listData,
  deleteAction,
  navigateToEdit,
  onPressAction,
  toBuyView = false,
  productListView = false,
  user = {},
}) => {

  const closeRow = (rowMap: any, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, element: any) => {
    closeRow(rowMap, element.key);
    deleteAction(element);
  };
  const goToEdit = (rowMap: any, element: any) => {
    closeRow(rowMap, element.key);
    navigateToEdit(element);
  };
  const onPress = (element: Product) => {
    onPressAction(element);
  };
  const onRowDidOpen = (rowKey: any) => {
    // console.log("This row opened", rowKey);
  };

  const renderItem = (data: any) => {
    const sharedWith =
      data.item.shoppers &&
      data.item.shoppers.filter((username: any) => username !== user.username);
    const sharedWithText = sharedWith && sharedWith.join(", ");
    return (
      <View>
        <TouchableHighlight
          onPress={() => onPress(data.item)}
          style={styles.rowFrontBig}
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

  const renderProductItem = (data: any) => (
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
            style={[styles.textItem, { color: !data.item.toBuy ? lightGrey : secondaryColor }]}
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

  const renderHiddenItem = (data: any, rowMap: any) => (
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
        <MaterialCommunityIcons name={toBuyView ? "playlist-remove" : "delete-outline"} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={listData}
      renderItem={productListView ? renderProductItem : renderItem}
      renderHiddenItem={renderHiddenItem}
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
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowAlign: {
    flexDirection: "row",
  },
  rowFront: {
    padding: 10,
    paddingLeft: 15,
    backgroundColor: lightGreyBackground,
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  rowFrontBig: {
    padding: 15,
    backgroundColor: lightGreyBackground,
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  textItem: {
    paddingRight: 50,
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
    paddingRight: 12,
    alignSelf: "center"
  },
});
