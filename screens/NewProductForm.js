import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { addProduct } from "../src/redux/actions/product";
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, Product } from "../src/models";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import UnitPicker from "../components/UnitPicker";
import { grey } from "../utils/colors"

const initialState = {
  name: "",
  checked: false,
  unit: "ct",
  quantity: 1,
};

const units = ["ct", "lb", "g", "kg", "L"];

const NewProductForm = (props) => {
  const [formState, setFormState] = useState(initialState);
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
    setFormState({ ...formState, [key]: count });
  }

  async function addProductHandler() {
    try {
      const product = { ...formState };

      // Retrieve List object
      const { groceryListID, category } = props.route.params;
      product.category = category;
      const currentList = await DataStore.query(GroceryList, groceryListID);
      // Add reference
      product.groceryList = currentList;
      // Convert Quantity to Int
      product.quantity = parseInt(product.quantity, 10);

      const productSaved = await DataStore.save(new Product(product));
      dispatch(addProduct(productSaved));
      props.navigation.goBack();
      console.log("Product saved successfully!");
    } catch (err) {
      console.log("error creating food:", err);
    }
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
      <SubmitBtn title="Add to List" onPress={addProductHandler} />
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