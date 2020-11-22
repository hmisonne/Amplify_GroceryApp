import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  handleAddProduct,
  handleUpdateProduct,
} from "../src/redux/actions/product";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import SelectionPicker from "../components/SelectionPicker";
import { grey, productCategory } from "../utils/helpers";



const units = ["ct", "lb", "g", "kg", "L"];

const NewProductForm = (props) => {
  const initialState = {
    name: "",
    checked: false,
    unit: "ct",
    quantity: 0,
    category: "Produce"
  };
  const productToUpdate = props.route.params.product;
  const [formState, setFormState] = useState(
    productToUpdate ? productToUpdate : initialState
  );
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

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

  function showQuantityUnit() {
    return(
      <View>
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
      </View>
    )
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

      <View>
        <SelectionPicker
          selectedValue={formState.category}
          onValueChange={(val) => setInput("category", val)}
          label={formState.category}
          value={formState.category}
          selection={Object.keys(productCategory)}
        />
      </View>
      <TouchableOpacity 
        onPress={handlePress}
        style={styles.rowAligned}>
        <Text>Optional: Specify quantity & package size</Text>
        <MaterialCommunityIcons 
          name={expanded ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"} 
          size={24} 
          color="black" />
      </TouchableOpacity>
      {expanded && showQuantityUnit()}
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
  rowAligned : {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
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
