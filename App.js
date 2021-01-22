import "babel-polyfill";
import React from "react";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Image } from "react-native";
import NewProductForm from "./screens/NewProductForm";
import NewGroceryListForm from "./screens/NewGroceryListForm";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import AppLoading from "expo-app-loading";

import {
  _cacheResourcesAsync,
  prepareResources,
} from "./hooks/prepareResources";
import store from "./src/redux/store";

import { mainColor, secondaryColor } from "./utils/helpers";
import JoinGroceryList from "./screens/JoinGroceryList";
import ProductList from "./screens/ProductList";
import ProductCategory from "./screens/ProductCategory";
import logo from "./assets/logo.png";

Amplify.configure({
  ...config,
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
  const isDataStoreReady = prepareResources();
  const [isAppReady, setAppReady] = React.useState(false);

  function goToSettings(props) {
    props.navigation.push("Settings");
  }
  const onToggleSnackBar = (bool) => setSnackVisible(bool);
  const [snackContent, setSnackContent] = React.useState("");
  const onSetSnackContent = (content) => setSnackContent(content);
  const [snackVisible, setSnackVisible] = React.useState(false);
  function toggleMessage(message) {
    console.log("toggleMessage");
    onSetSnackContent(message);
    onToggleSnackBar(true);
  }

  if (!isAppReady || !isDataStoreReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <ProductStack.Navigator>
            <ProductStack.Screen
              name="Home"
              options={(props) => ({
                title: "My Grocery Lists",
                headerLeft: () => (
                  <Image
                    source={logo}
                    style={{ width: 30, height: 30, marginLeft: 20 }}
                  />
                ),
                headerRight: () => (
                  <MaterialCommunityIcons
                    onPress={() => goToSettings(props)}
                    name="settings-outline"
                    color={secondaryColor}
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
            >
              {(props) => (
                <Home
                  {...props}
                  snackVisible={snackVisible}
                  snackContent={snackContent}
                  toggleMessage={(message) => toggleMessage(message)}
                  onDismissSnackBar={() => onToggleSnackBar(false)}
                />
              )}
            </ProductStack.Screen>
            <ProductStack.Screen
              name="ProductList"
              component={ProductList}
              options={(props) => ({
                title: `${props.route.params.groceryList.name}`,
                headerTintColor: secondaryColor,
              })}
            />
            <ProductStack.Screen
              name="NewList"
              component={NewGroceryListForm}
              options={(props) => ({
                headerTintColor: secondaryColor,
                title: props.route.params.groceryList ? `Update` : `New List`,
              })}
            />
            <ProductStack.Screen
              name="JoinGroceryList"
              component={JoinGroceryList}
              options={{
                title: "Join Grocery List",
                headerTintColor: secondaryColor,
              }}
            />
            <ProductStack.Screen
              name="AddProduct"
              component={NewProductForm}
              options={(props) => ({
                headerTintColor: secondaryColor,
                title: props.route.params.product ? `Update` : `New Item`,
              })}
            />
            <ProductStack.Screen
              name="ProductCategory"
              component={ProductCategory}
              options={{
                headerTintColor: secondaryColor,
                title: "Category",
              }}
            />
            <ProductStack.Screen
              name="Settings"
              component={Settings}
              options={() => ({
                title: "Settings",
                headerTintColor: secondaryColor,
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
  header: "Sign Up",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "Username:",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password (8 characters min):",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
    {
      label: "Email:",
      key: "email",
      required: true,
      displayOrder: 3,
      type: "string",
    },
  ],
};

export default withAuthenticator(App, { signUpConfig });
