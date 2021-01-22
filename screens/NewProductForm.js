import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  handleAddProduct,
  handleUpdateProduct,
} from "../src/redux/actions/product";
import StyledTextInput from "../components/StyledTextInput";
import Stepper from "../components/Stepper";
import SelectionPicker from "../components/SelectionPicker";
import { productCategory } from "../utils/helpers";
import { Divider, Subheading } from "react-native-paper";
import AccordionMenu from "../components/AccordionMenu";

const units = ["ct", "lb", "g", "kg", "L"];
const initialState = {
  name: "",
  checked: false,
  toBuy: true,
  unit: "ct",
  quantity: 0,
  category: "Other",
};

const NewProductForm = ({ route, navigation, toggleMessage }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: () => (
          <Button
            mode="contained"
            onPress={productToUpdate ? updateProductHandler : addProductHandler}
            disabled={validateForm()}
            style={{ marginRight: 15 }}
          >
            Save
          </Button>
        ),
      },
      []
    );
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const validateForm = () => {
    return (
      formState.name === "" || !Number.isInteger(parseInt(formState.quantity))
    );
  };
  const productToUpdate = route.params?.product;
  const [formState, setFormState] = useState(
    productToUpdate ? productToUpdate : initialState
  );
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  const dispatch = useDispatch();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
    if (key == "quantity") {
      const forbiddenCharacters = [",",".","-"," "]
      if (forbiddenCharacters.some(el => value.includes(el)) || !Number.isInteger(parseInt(value))) {
        setAlertText("Only numbers are allowed. Please enter a number without decimals");
        return setAlertVisible(true);
      } else setAlertVisible(false);
    }
  }

  const onToggleSwitch = () =>
    setFormState({ ...formState, toBuy: !formState.toBuy });

  function onIncrement(key) {
    const count = (parseInt(formState[key], 10) || 0) + 1;
    setFormState({ ...formState, [key]: count });
    setAlertVisible(false);
  }
  function goToProductCategory() {
    navigation.push("ProductCategory", {
      category: formState.category,
      updateCategory: (value) => setInput("category", value),
    });
  }
  function onDecrement(key) {
    const count = (parseInt(formState[key], 10) || 0) - 1;
    setFormState({ ...formState, [key]: count < 0 ? 0 : count });
    setAlertVisible(false);
  }

  async function updateProductHandler() {
    const product = { ...formState };
    // Convert Quantity to Int
    product.quantity = parseInt(product.quantity, 10);
    dispatch(handleUpdateProduct(product));
    toggleMessage(`✅ ${product.name} updated!`)
    navigation.goBack();
  }

  async function addProductHandler() {
    const product = { ...formState };
    const { groceryListID } = route.params;
    // Convert Quantity to Int
    product.quantity = parseInt(product.quantity, 10);

    dispatch(handleAddProduct(product, groceryListID));
    toggleMessage(`✅ ${product.name} created and added to My List!`)
    navigation.goBack();
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
            <View>
              <View style={styles.stepperAndText}>
                <Stepper
                  onIncrement={() => onIncrement("quantity")}
                  onDecrement={() => onDecrement("quantity")}
                />
                <StyledTextInput
                  style={styles.numInput}
                  onChangeText={(val) => setInput("quantity", val)}
                  keyboardType="numeric"
                  value={`${formState.quantity}`}
                />
              </View>
              <HelperText
                type="error"
                visible={alertVisible}
                style={{ textAlign: "center" }}
              >
                {alertText}
              </HelperText>
            </View>
            <SelectionPicker
              selectedValue={formState.unit}
              onValueChange={(val) => setInput("unit", val)}
              label={formState.unit}
              value={formState.unit}
              selection={units}
            />
            <Divider />
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
                label="Product Name"
                value={formState.name}
                multiline={true}
                placeholder="Golden Apple"
              />
            </View>
            <Divider />
            <View>
              <Text style={styles.marginBottom}>Select a Category:</Text>
              <TouchableOpacity
                style={styles.border}
                onPress={goToProductCategory}
              >
                <View style={styles.rowAligned}>
                  <MaterialCommunityIcons
                    name={productCategory[formState.category].picture}
                    size={24}
                    color="black"
                  />
                  <Subheading style={styles.rowAligned}>
                    {productCategory[formState.category].name}
                  </Subheading>
                </View>
              </TouchableOpacity>
            </View>
            <Divider />

            <AccordionMenu
              text="Optional: Specify quantity & package size"
              expanded={expanded}
              handlePress={handlePress}
            />
            <Divider />
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
    marginLeft: 15,
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
  marginBottom: {
    marginBottom: 10,
  },
  numInput: {
    width: 100,
  },
  border: {
    borderColor: "#969696",
    borderWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
  },
});
