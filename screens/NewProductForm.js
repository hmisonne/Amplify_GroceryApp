import React, { useState } from "react";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import { useDispatch } from "react-redux";
import {
  handleAddProduct,
  handleUpdateProduct,
} from "../src/redux/actions/product";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import SelectionPicker from "../components/SelectionPicker";
import { grey, mainColor, productCategory } from "../utils/helpers";
import { Divider, Switch, Subheading } from "react-native-paper";
import AccordionMenu from "../components/AccordionMenu";

const units = ["ct", "lb", "g", "kg", "L"];

const NewProductForm = (props) => {
  const initialState = {
    name: "",
    checked: false,
    toBuy: true,
    unit: "ct",
    quantity: 0,
    category: "Produce",
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

  const onToggleSwitch = () =>
    setFormState({ ...formState, toBuy: !formState.toBuy });

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
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Divider />
        <AccordionMenu
          text="Optional: Specify quantity & package size"
          expanded={expanded}
          handlePress={handlePress}
        />
        <Divider />
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
        <SelectionPicker
          selectedValue={formState.unit}
          onValueChange={(val) => setInput("unit", val)}
          label={formState.unit}
          value={formState.unit}
          selection={units}
        />

        <View>
          {productToUpdate ? (
            <SubmitBtn title="Update" onPress={updateProductHandler} />
          ) : (
            <SubmitBtn title="Add to List" onPress={addProductHandler} />
          )}
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }

  function showForm() {
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <StyledTextInput
            onChangeText={(val) => setInput("name", val)}
            label="Name"
            value={formState.name}
            placeholder="Golden Apple"
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

        <Divider />
        <View style={[styles.rowAligned, styles.spaceBetween]}>
          <Subheading>To Buy?</Subheading>
          <Switch
            color={mainColor}
            value={formState.toBuy}
            onValueChange={onToggleSwitch}
          />
        </View>
        <Divider />
        <AccordionMenu
          text="Optional: Specify quantity & package size"
          expanded={expanded}
          handlePress={handlePress}
        />
        <Divider />
        <View>
          {productToUpdate ? (
            <SubmitBtn title="Update" onPress={updateProductHandler} />
          ) : (
            <SubmitBtn title="Add to List" onPress={addProductHandler} />
          )}
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }

  return expanded ? showQuantityUnit() : showForm();
};

export default NewProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  rowAligned: {
    flexDirection: "row",
    marginLeft: 20,
    // marginRight: 30,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  stepperAndText: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    // marginLeft: 30,
    // marginRight: 30,
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