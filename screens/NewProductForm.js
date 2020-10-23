import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../src/redux/actions/product";
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, Product } from "../src/models";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import UnitPicker from "../components/UnitPicker";
import { grey } from "../utils/colors"
import { createNewProduct } from "../utils/api";

const initialState = {
  name: "",
  checked: false,
  unit: "ct",
  quantity: 1,
};

const units = ["ct", "lb", "g", "kg", "L"];

const NewProductForm = (props) => {
  const productToUpdate= props.route.params.product
  const [formState, setFormState] = useState(productToUpdate? 
    productToUpdate
    :initialState);
  const dispatch = useDispatch();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function onIncrement(key) {
    const count = parseInt(formState[key], 10) + 1;
    setFormState({ ...formState, [key]: count });
  }

  function onDecrement(key) {
    const count = parseInt(formState[key], 10) - 1;
    setFormState({ ...formState, [key]: count < 0 ? 0 : count });
  }

  async function updateProductHandler() {
    try {
      const product = { ...formState };
      const original = await DataStore.query(Product, product.id);
      // Convert Quantity to Int
      product.quantity = parseInt(product.quantity, 10);

      const updatedProduct =  await DataStore.save(
        Product.copyOf(original, (updated) => {
          updated.name = product.name
          updated.unit = product.unit
          updated.quantity = product.quantity
        })
      )
      dispatch(updateProduct(updatedProduct));
      props.navigation.goBack();
      console.log("Product saved successfully!");
    } catch (err) {
      console.log("error creating food:", err);
    }
  }

  async function addProductHandler() {
    const product = { ...formState };
    const { groceryListID, category } = props.route.params;
    product.category = category;
    product.quantity = parseInt(product.quantity, 10);
    console.log('product',product,'groceryListID',groceryListID)
    const productSaved = await createNewProduct(product, groceryListID)
    dispatch(addProduct(productSaved));
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={(val) => setInput("name", val)}
        value={formState.name}
        placeholder="Name"
      />
      <View style={styles.stepperAndText}>
        <Stepper
          onIncrement={() => onIncrement("quantity")}
          onDecrement={() => onDecrement("quantity")}
        />
        <TextInput
          style={styles.numInput}
          onChangeText={(val) => setInput("quantity", val)}
          keyboardType="numeric"
          value={`${formState.quantity}`}
          placeholder="quantity"
        />
      </View>

      <UnitPicker
        selectedValue={formState.unit}
        onValueChange={(val) => setInput("unit", val)}
        label={formState.unit}
        value={formState.unit}
        units={units}
      />
      {
        productToUpdate?
        <SubmitBtn title="Update" onPress={updateProductHandler} />
        :
        <SubmitBtn title="Add to List" onPress={addProductHandler} />
      }
    </View>
  );
};

export default NewProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  stepperAndText: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },
  numInput: {
    flex: 1,
    height: 40,
    borderColor: grey,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
  }
});