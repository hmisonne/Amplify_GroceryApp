import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Subheading } from "react-native-paper";
import { Hub } from "aws-amplify";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
  syncDatastore,
} from "../src/redux/actions/groceryList";
import UndoRedo from "../containers/UndoRedo";
import FabBar from "../components/FabBar";
import LoadingCircle from "../components/LoadingCircle";
import MenuOptions from "../components/MenuOptions";

const Home = ({ groceryLists, navigation }) => {
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

  const actionsMenu = [
    {
      icon: "share-variant",
      title: "Share List",
      validationNeeded: false,
      onPress: (groceryList) =>
        navigation.push("ShareGroceryList", { groceryList }),
    },
    {
      icon:"pencil-box-outline",
      title: "Edit List",
      onPress: (groceryList) =>
        navigation.push("NewList", { groceryList }),
    },
    {
      icon: "delete-outline",
      title: "Delete",
      validationNeeded: true,
      onPress: (groceryList) => removeGroceryList(groceryList.id),
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
      <View style={styles.centered}>
        <Subheading style={styles.text}>
          Create your first grocery list by clicking on the + icon !
        </Subheading>
      </View>
    );
  }

  function displayUserGroceryLists() {
    return (
      <View style={styles.container}>
        {groceryLists.map((glist) => (
          <View key={glist.id}>
            <View style={styles.glist}>
              <TouchableOpacity onPress={() => goToList(glist)}>
                <View style={styles.subContainer}>
                  <MaterialCommunityIcons
                    name="format-list-checks"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.glistName}>{glist.name}</Text>
                </View>
              </TouchableOpacity>
              <MenuOptions actionsMenu={actionsMenu} groceryList={glist}/>
            </View>
            <Divider style={{ height: 1 }} />
          </View>
        ))}
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    groceryLists: state.groceryLists.present,
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "row",
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
  glist: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  glistName: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
