import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import { handleLoadProducts } from "../src/redux/actions/product";
import { blue, grey, categories } from "../utils/helpers";
import RoundButton from "../components/RoundButton";

const ProductCategory = (props) => {
  const dispatch = useDispatch();
  const groceryListID = props.route.params.groceryList.id;
  const { products } = props;
  useEffect(() => {
    dispatch(handleLoadProducts(groceryListID));
  }, []);

  function goToProductList(category) {
    return props.navigation.push("ProductList", { category, groceryListID });
  }
  function productCountPerCat(category) {
    return products.filter((product) => product.category === category).length;
  }

  function productCheckedCountPerCat(category) {
    return products.filter(
      (product) => product.category === category && product.checked === true
    ).length;
  }
  function allProductChecked(category) {
    return productCheckedCountPerCat(category) === productCountPerCat(category);
  }
  function showCategories() {
    return (
      <View style={styles.container}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            onPress={() => goToProductList(cat.name)}
            style={styles.vignetteItem}
            key={index}
          >
            <MaterialCommunityIcons name={cat.img} size={100} color={grey} />
            <Text style={styles.text}>
              {cat.name.toUpperCase()}
              {productCountPerCat(cat.name) > 0 && (
                <Text style={{ color: allProductChecked(cat.name) && blue }}>
                  {productCheckedCountPerCat(cat.name)}/
                  {productCountPerCat(cat.name)}
                </Text>
              )}
            </Text>
            {productCountPerCat(cat.name) > 0 && (
              <RoundButton
                name={
                  allProductChecked(cat.name)
                    ? "check-circle"
                    : "check-circle-outline"
                }
                color={allProductChecked(cat.name) ? blue : grey}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View>
      {Platform.OS === "default" ? (
        <View>{showCategories()}</View>
      ) : (
        <ScrollView>{showCategories()}</ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductCategory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    padding: 8,
    flexWrap: "wrap",
  },
  vignetteItem: {
    alignItems: "center",
    width: 150,
    height: 150,
    margin: 10,
  },
  button: {
    marginVertical: 10,
    margin: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  innerText: {
    color: blue,
  },
});
