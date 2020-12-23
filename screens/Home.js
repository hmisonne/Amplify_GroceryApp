import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Hub } from "aws-amplify";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
  syncDatastore,
} from "../src/redux/actions/groceryList";
import UndoRedo from "../containers/UndoRedo";
import FabBar from "../components/FabBar";
import LoadingCircle from "../components/LoadingCircle";
import SwipeList from "../components/SwipeList";
import FadeInView from "../components/FadeInView";
import { createTwoButtonAlert } from "../utils/helpers";

const Home = ({ groceryLists, navigation, user }) => {
  const [visible, setVisible] = React.useState(false);
  const [isReady, setReady] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuthentificateUser()).then((groceryLists) => {
      if (groceryLists && groceryLists.length !== 0) {
        syncDatastore(groceryLists, "LOAD");
      } else (
        setReady(true)
      )
    });

    const removeListener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "ready") {
        console.log("Ready load grocery list HOME");
        dispatch(handleLoadGroceryLists());
        setReady(true)
        removeListener();
      }
    });
    
  }, []);

  function removeListWithValidation(groceryList){
    const validationText = `Are you sure you want to delete this list?`
    createTwoButtonAlert(() => removeGroceryList(groceryList.id), validationText)
  }
  function removeGroceryList(groceryListID) {
    dispatch(handleDeleteGroceryList(groceryListID));
    onToggleSnackBar();
  }

  function displayLoadingCircle() {
    return (
      <View style={styles.centered}>
        <LoadingCircle />
      </View>
    );
  }
  const actions = [
    {
      icon: "format-list-checks",
      label: "New List",
      onPress: () => navigation.push("NewList", { nav: 'newList' }),
    },
    {
      icon: "account-group",
      label: "Join List",
      onPress: () => navigation.push("JoinGroceryList"),
    },
  ];


  return (
    <View style={styles.container}>
      {!isReady 
      ? displayLoadingCircle()
        : groceryLists.length === 0
          ? displayInstructions()
          : displayUserGroceryLists()
        }
      <FabBar actions={actions} />
      <UndoRedo visible={visible} onDismissSnackBar={onDismissSnackBar} />
    </View>
  );

  function goToList(groceryList) {
    return navigation.push("ProductList", { groceryList });
  }
  function displayInstructions() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FadeInView style={{width: 250, height: 50}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Create your first grocery list by clicking on the + icon</Text>
        </FadeInView>
      </View>
    )
    
  }
  function displayUserGroceryLists(){
    return(
      <SwipeList
        user = {user}
        listData = {groceryLists}
        deleteAction = {(groceryList) => removeListWithValidation(groceryList)}
        navigateToEdit = {(groceryList) => navigation.push("NewList", { groceryList })}
        onPressAction = {(groceryList) => goToList(groceryList)}
      />
    )
  }
};

function mapStateToProps(state) {
  return {
    groceryLists: state.groceryLists.present,
    user: state.user
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
  },
});
