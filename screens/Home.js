import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Hub } from "aws-amplify";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
  syncDatastore,
} from "../src/redux/actions/groceryList";
import FabBar from "../components/FabBar";
import LoadingCircle from "../components/LoadingCircle";
import SwipeList from "../components/SwipeList";
import FadeInView from "../components/FadeInView";
import { createTwoButtonAlert } from "../utils/helpers";
import SnackBar from "../components/SnackBar";

const Home = ({
  groceryLists,
  navigation,
  user,
  snackContent,
  snackVisible,
  onDismissSnackBar,
  toggleMessage,
}) => {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuthentificateUser()).then((groceryLists) => {
      if (groceryLists && groceryLists.length !== 0) {
        syncDatastore(groceryLists, "LOAD");
      } else setReady(true);
    });

    const removeListener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "ready") {
        console.log("Ready load grocery list HOME");
        dispatch(handleLoadGroceryLists());
        setReady(true);
        removeListener();
      }
    });
  }, []);

  function removeListWithValidation(groceryList) {
    const validationText = `Are you sure you want to delete this list?`;
    createTwoButtonAlert(() => removeGroceryList(groceryList), validationText);
  }
  function removeGroceryList(groceryList) {
    dispatch(handleDeleteGroceryList(groceryList.id));
    toggleMessage(`❌ ${groceryList.name} deleted`);
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
      onPress: () => navigation.push("NewList"),
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
        : displayUserGroceryLists()}

      <SnackBar
        visible={snackVisible}
        onDismissSnackBar={onDismissSnackBar}
        snackContent={snackContent}
      />
      <FabBar actions={actions} />
    </View>
  );

  function goToList(groceryList) {
    return navigation.push("ProductList", { groceryList });
  }
  function displayInstructions() {
    return (
      <TouchableOpacity
        onPress={() => navigation.push("NewList")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <FadeInView style={{ width: 250, height: 50 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Create your first grocery list by clicking on the + icon
          </Text>
        </FadeInView>
      </TouchableOpacity>
    );
  }
  function displayUserGroceryLists() {
    return (
      <SwipeList
        user={user}
        listData={groceryLists
          .sort((a, b) => b._lastChangedAt - a._lastChangedAt)
          .map((groceryList) => ({
            ...groceryList,
            key: groceryList.id,
          }))}
        deleteAction={(groceryList) => removeListWithValidation(groceryList)}
        navigateToEdit={(groceryList) =>
          navigation.push("NewList", { groceryList })
        }
        onPressAction={(groceryList) => goToList(groceryList)}
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    groceryLists: state.groceryLists.present,
    user: state.user,
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
