import "babel-polyfill";
import React from "react";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import NewProductForm from "./screens/NewProductForm";
import NewGroceryListForm from "./screens/NewGroceryListForm";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import LoadingScreen from "./screens/LoadingScreen"

import prepareResources from "./hooks/prepareResources";
import RoundButton from "./components/RoundButton";
import store from "./src/redux/store";

import {blue, mainColor, secondaryColor } from "./utils/helpers"
import JoinGroceryList from "./screens/JoinGroceryList";
import ShareGroceryList from "./screens/ShareGroceryList";
import ProductList from "./screens/ProductList";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: mainColor,
    accent: secondaryColor,
  },
};

const ProductStack = createStackNavigator();

const App = () => {
  const isAppReady = prepareResources();
  function goToNewProductScreen(props) {
    props.navigation.push("AddProduct", {
      groceryListID: props.route.params.groceryList.id,
    });
  }

  function goToSettings(props) {
    props.navigation.push("Settings")
  }
  if (!isAppReady) {
    return (
      <LoadingScreen/>
    )
  }
  return (
    <Provider store={store}>
       <PaperProvider theme={theme}>
      <NavigationContainer>
        <ProductStack.Navigator>
          <ProductStack.Screen
            name="Home"
            component={Home}
            options={(props) => ({
              title: "My Grocery Lists",
              headerRight: () => (
                <MaterialCommunityIcons
                  onPress={() => goToSettings(props)}
                  name="settings-outline"
                  color= {secondaryColor}
                  size={20}
                  style={{ marginRight: 20 }}
                />
              ),
              headerStyle: {
                backgroundColor: mainColor,
              },
              headerTintColor: secondaryColor,
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
            })}
          />
          <ProductStack.Screen
            name="ProductList"
            component={ProductList}
            options={(props) => ({
              title: `${props.route.params.groceryList.name}`,
              headerTintColor: secondaryColor,
              headerRight: () => (
                <RoundButton
                  onPress={() => goToNewProductScreen(props)}
                  name="plus-circle"
                  color={mainColor}
                  style={{ marginRight: 20 }}
                />
              ),
            })}
          />
          <ProductStack.Screen
            name="NewList"
            component={NewGroceryListForm}
            options={{ 
              title: "My New List",
              headerTintColor: secondaryColor }}
          />
           <ProductStack.Screen
            name="JoinGroceryList"
            component={JoinGroceryList}
            options={{ title: "Join Grocery List", headerTintColor: secondaryColor }}
          />
          <ProductStack.Screen
            name="AddProduct"
            component={NewProductForm}
            options={(props) => ({
              headerTintColor: secondaryColor,
              title: props.route.params.product?
              `Update ${props.route.params.product.name}`
              : `Add New Product`,
            })}
          />
          <ProductStack.Screen
            name="Settings"
            component={Settings}
            options={(props) => ({
              title: "Settings",
              headerTintColor: secondaryColor
            })}
          />
          <ProductStack.Screen
            name="ShareGroceryList"
            component={ShareGroceryList}
            options={() => ({
              title: "Share your list",
              headerTintColor: secondaryColor
            })}
          />
        </ProductStack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </PaperProvider>
    </Provider>
  );
};

const signUpConfig = {
  header: 'Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Username:',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password (8 characters min):',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'Email:',
      key: 'email',
      required: true,
      displayOrder: 3,
      type: 'string'
    }
  ]
};

export default withAuthenticator(App, { signUpConfig });