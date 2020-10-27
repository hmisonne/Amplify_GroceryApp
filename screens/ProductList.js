import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  handleDeleteProduct,
  handleToggleProduct,
} from "../src/redux/actions/product";
import RoundButton from "../components/RoundButton";
import { grey } from "../utils/helpers";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const { products } = props;
  const { category } = props.route.params;
  const productsByCat = products.filter(
    (product) => product.category === category
  );

  async function onToggle(product) {
    dispatch(handleToggleProduct(product));
  }

  function removeProduct(productID) {
    dispatch(handleDeleteProduct(productID));
  }
  function goToEditProduct(product) {
    return props.navigation.push("AddProduct", { product });
  }

  function showProductList() {
    return (
      <View style={styles.container}>
        {productsByCat.map((product, index) => (
          <View
            style={[styles.subContainer, styles.marginBottom]}
            key={product.id ? product.id : index}
          >
            <View style={styles.subContainer}>
              <Switch
                value={product.checked}
                onValueChange={() => onToggle(product)}
              />
              <TouchableOpacity
                style={styles.textAndQty}
                onPress={() => goToEditProduct(product)}
              >
                <View>
                  <Text>{product.name}</Text>
                </View>
                <View>
                  <Text>
                    {product.quantity} {product.unit}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <RoundButton
              onPress={() => removeProduct(product.id)}
              name="minus-circle"
              color={grey}
            />
          </View>
        ))}
      </View>
    );
  }
  return (
    <View>
      {Platform.OS !== "ios" && Platform.OS !== "android" ? (
        <View>{showProductList()}</View>
      ) : (
        <ScrollView>{showProductList()}</ScrollView>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textAndQty: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: 15,
    marginLeft: 15,
    fontSize: 18,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
  },
  marginBottom: {
    marginBottom: 15,
  },
});
