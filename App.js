import "babel-polyfill";
import React from "react";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';

import NewProductForm from "./screens/NewProductForm";
import ProductList from "./screens/ProductList";
import ProductCategory from "./screens/ProductCategory";
import NewGroceryListForm from "./screens/NewGroceryListForm";
import AllGroceryLists from "./screens/AllGroceryLists";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import LoadingScreen from "./screens/LoadingScreen"

import prepareResources from "./hooks/prepareResources";
import RoundButton from "./components/RoundButton";
import store from "./src/redux/store";

import {blue } from "./utils/helpers"
import JoinGroceryList from "./screens/JoinGroceryList";
import ShareGroceryList from "./screens/ShareGroceryList";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

// LogBox.ignoreLogs(['Setting a timer'])

const ProductStack = createStackNavigator();

const App = () => {
  const isAppReady = prepareResources();
  function goToNewProductScreen(props) {
    props.navigation.push("AddProduct", {
      category: props.route.params.category,
      groceryListID: props.route.params.groceryListID,
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
                  color="#fff"
                  size={20}
                  style={{ marginRight: 20 }}
                />
              ),
              headerStyle: {
                backgroundColor: blue,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
            })}
          />
          <ProductStack.Screen
            name="ProductCategory"
            component={ProductCategory}
            options={(props) => ({
              title: `${props.route.params.groceryList.name}`,
              headerTintColor: blue,
            })}
          />
          <ProductStack.Screen
            name="NewList"
            component={NewGroceryListForm}
            options={{ 
              title: "My New List",
              headerTintColor: blue }}
          />
          <ProductStack.Screen
            name="AllGroceryLists"
            component={AllGroceryLists}
            options={{ title: "Browse Grocery Lists", headerTintColor: blue }}
          />
           <ProductStack.Screen
            name="JoinGroceryList"
            component={JoinGroceryList}
            options={{ title: "Join Grocery List", headerTintColor: blue }}
          />
          <ProductStack.Screen
            name="ProductList"
            component={ProductList}
            options={(props) => ({
              title: props.route.params.category,
              headerTintColor: blue,
              headerRight: () => (
                <RoundButton
                  onPress={() => goToNewProductScreen(props)}
                  name="plus-circle"
                  color={blue}
                  style={{ marginRight: 20 }}
                />
              ),
            })}
          />
          <ProductStack.Screen
            name="AddProduct"
            component={NewProductForm}
            options={(props) => ({
              headerTintColor: blue,
              title: props.route.params.product?
              `Update ${props.route.params.product.name}`
              : `Add New ${props.route.params.category}`,
            })}
          />
          <ProductStack.Screen
            name="Settings"
            component={Settings}
            options={(props) => ({
              title: "Settings",
              headerTintColor: blue
            })}
          />
          <ProductStack.Screen
            name="ShareGroceryList"
            component={ShareGroceryList}
            options={() => ({
              title: "Share your list",
              headerTintColor: blue
            })}
          />
        </ProductStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default withAuthenticator(App);
