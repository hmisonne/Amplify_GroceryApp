import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { categoryPictures } from "../utils/helpers";

export const products = [
  { name: "Berry", category: "Produce", id: "1" },
  { name: "Apple", category: "Produce", id: "2" },
  { name: "Lamb", category: "Meat", id: "3" },
];

export default function SwipeSectionList() {
  // const { products } = props
  const currCategories = new Set();
  products.forEach((product) => currCategories.add(product.category));
  let currListCategories = Array.from(currCategories);

  const [listData, setListData] = useState(
    currListCategories.map((cat) => ({
      title: cat,
      data: products
        .filter((product) => product.category === cat)
        .map((product) => ({ text: product.name, key: product.id })),
    }))
  );
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const [section] = rowKey.split(".");
    const newData = [...listData];
    const prevIndex = listData[section].data.findIndex(
      (item) => item.key === rowKey
    );
    newData[section].data.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = data => (
    <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={styles.rowFront}
        underlayColor={'#AAA'}
    >
        <View>
            <Text> {data.item.text} </Text>
        </View>
    </TouchableHighlight>
);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => closeRow(rowMap, data.item.key)}
        >
            <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteRow(rowMap, data.item.key)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
);

  const renderSectionHeader = ({ section }) => 
    <Text style={styles.sectionText}>
      <MaterialCommunityIcons name={categoryPictures[section.title]} size={20} />
      {section.title}
    </Text>;

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    sectionText: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});