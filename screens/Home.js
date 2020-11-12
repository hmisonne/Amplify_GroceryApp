import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
  syncDatastore,
} from "../src/redux/actions/groceryList";
import RoundButton from "../components/RoundButton";
import FabBar from "../components/FabBar";
import UndoRedo from "../containers/UndoRedo";
import { Hub } from "aws-amplify";

const Home = (props) => {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();
  const { groceryLists } = props;

  useEffect(() => {
    dispatch(handleAuthentificateUser()).then((groceryLists) => {
      if (groceryLists && groceryLists.length !== 0) {
        syncDatastore(groceryLists, 'LOAD');
        ;
      }
    });

    const removeListener =
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if ( event === "ready") {
        console.log("Ready load grocery list HOME");
        dispatch(handleLoadGroceryLists());
        removeListener();
      }
    });
  }, []);


  function removeGroceryList(groceryListID) {
    dispatch(handleDeleteGroceryList(groceryListID));
    onToggleSnackBar();
  }

  function showGroceryListID(groceryListID) {
    return props.navigation.push("ShareGroceryList", { groceryListID });
  }

  const actions = [
    {
      icon: "format-list-checks",
      label: "New List",
      onPress: () => props.navigation.push("NewList"),
    },
    {
      icon: "account-group",
      label: "Join List",
      onPress: () => props.navigation.push("JoinGroceryList"),
    },
  ];
  return (
    <View style={styles.container}>
      {groceryLists.length === 0
        ? displayInstructions()
        : displayUserGroceryLists()}
      <View>
        <FabBar actions={actions} />
      </View>
      <View>
        <UndoRedo visible={visible} onDismissSnackBar={onDismissSnackBar} />
      </View>
    </View>
  );

  function goToList(groceryList) {
    return props.navigation.push("ProductCategory", { groceryList });
  }
  function displayInstructions() {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Create your first grocery list by clicking on the + icon !
        </Text>
      </View>
    );
  }

  function displayUserGroceryLists() {
    return (
      <View style={styles.container}>
        {groceryLists.map((glist, index) => (
          <View style={styles.glist} key={glist.id ? glist.id : index}>
            <TouchableOpacity
              style={styles.product}
              onPress={() => goToList(glist)}
            >
              <View style={styles.subContainer}>
                <Text style={styles.glistName}>{glist.name}</Text>
              </View>
            </TouchableOpacity>
            <RoundButton
              onPress={() => showGroceryListID(glist.id)}
              name="share-variant"
              color="black"
            />
            <RoundButton
              onPress={() => removeGroceryList(glist.id)}
              name="delete-outline"
              color="black"
            />
          </View>
        ))}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  groceryLists: state.groceryLists.present,
  user: state.user,
});

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
    padding: 20,
  },
  bottom2: {
    alignItems: "flex-end",
    marginBottom: 46,
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 46,
  },
  glist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  glistName: { fontSize: 18 },
});
