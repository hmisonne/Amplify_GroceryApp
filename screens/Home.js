import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { handleAuthentificateUser } from "../src/redux/actions/user";
import {
  handleDeleteGroceryList,
  handleLoadGroceryLists,
  syncDatastore,
} from "../src/redux/actions/groceryList";
import RoundButton from "../components/RoundButton";
import FabBar from "../components/FabBar";
import UndoRedo from "../containers/UndoRedo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PopUpMenu from "../components/PopUpMenu";
import PopUpMenuMobile from "../components/PopUpMenuMobile";
import { Hub } from "aws-amplify";
import { Divider } from "react-native-paper";

const Home = ({groceryLists, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuthentificateUser()).then((groceryLists) => {
      if (groceryLists && groceryLists.length !== 0) {
        syncDatastore(groceryLists, "LOAD");
      }
    });

    const removeListener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "ready") {
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

  const actionsMenu = [
    {
      icon: "share-variant",
      title: "Share",
      onPress: (groceryListID) =>
        navigation.push("ShareGroceryList", { groceryListID }),
    },
    // {
    //   icon:"pencil-box-outline",
    //   title: "Update",
    //   onPress: () => {},
    // },
    {
      icon: "delete-outline",
      title: "Delete",
      onPress: (groceryListID) => removeGroceryList(groceryListID),
    },
  ];

  return (
    <View style={styles.container}>
      {groceryLists.length === 0
        ? displayInstructions()
        : displayUserGroceryLists()}

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
          <View>
            <View style={styles.glist} key={glist.id}>
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
              {Platform.OS === "ios" || Platform.OS === "android" ? (
                <PopUpMenuMobile
                  actionsMenu={actionsMenu}
                  groceryListID={glist.id}
                />
              ) : (
                <PopUpMenu actionsMenu={actionsMenu} groceryListID={glist.id} />
              )}
            </View>
            <Divider style={{height:1}} key={index} />
          </View>
        ))}
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    groceryLists: state.groceryLists.present,
  }
};

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
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  glistName: {
    fontSize: 18,
    paddingLeft: 15,
  },
});

{
  /* <RoundButton
              onPress={() => showGroceryListID(glist.id)}
              name="share-variant"
              color="black"
            />
            <RoundButton
              onPress={() => removeGroceryList(glist.id)}
              name="delete-outline"
              color="black"
            /> */
}
