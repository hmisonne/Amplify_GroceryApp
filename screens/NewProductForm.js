import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import {
  handleAddProduct,
  handleUpdateProduct,
} from "../src/redux/actions/product";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import SelectionPicker from "../components/SelectionPicker";
import { categories, grey } from "../utils/helpers";



const units = ["ct", "lb", "g", "kg", "L"];

const NewProductForm = (props) => {
  const initialState = {
    name: "",
    checked: false,
    unit: "ct",
    quantity: 1,
    category: props.route.params.category
  };
  const productToUpdate = props.route.params.product;
  const [formState, setFormState] = useState(
    productToUpdate ? productToUpdate : initialState
  );
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
    const product = { ...formState };
    // Convert Quantity to Int
    product.quantity = parseInt(product.quantity, 10);
    dispatch(handleUpdateProduct(product));
    props.navigation.goBack();
  }

  async function addProductHandler() {
    const product = { ...formState };
    const { groceryListID } = props.route.params;
    // Convert Quantity to Int
    product.quantity = parseInt(product.quantity, 10);

    dispatch(handleAddProduct(product, groceryListID));
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <StyledTextInput
          onChangeText={(val) => setInput("name", val)}
          value={formState.name}
          placeholder="Name"
        />
      </View>

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
      <View>
        <SelectionPicker
          selectedValue={formState.unit}
          onValueChange={(val) => setInput("unit", val)}
          label={formState.unit}
          value={formState.unit}
          selection={units}
        />
      </View>
      <View>
        <SelectionPicker
          selectedValue={formState.category}
          onValueChange={(val) => setInput("category", val)}
          label={formState.category}
          value={formState.category}
          selection={categories.map(cat=>cat.name)}
        />
      </View>
      <View>
        {productToUpdate ? (
          <SubmitBtn title="Update" onPress={updateProductHandler} />
        ) : (
          <SubmitBtn title="Add to List" onPress={addProductHandler} />
        )}
      </View>
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
    alignItems: "center",
  },
  numInput: {
    height: 40,
    width: 50,
    borderColor: grey,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
  },
});
