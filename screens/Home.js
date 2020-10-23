import React, { useEffect } from "react";
import SubmitBtn from "../components/SubmitBtn";
import { identifyUser } from "../utils/api";
import { connect, useDispatch } from "react-redux";
import store from "../src/redux/store";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RoundButton from "../components/RoundButton";
import { removeGroceryListFromUser, fetchUserGroceryLists } from "../utils/api";
import { blue } from "../utils/colors";

const Home = (props) => {
  const dispatch = useDispatch();
  const { groceryLists, user } = store.getState();
  useEffect(() => {
    loadResources();
    // const subscription = DataStore.observe(User).subscribe((msg) => {
    //   console.log("sync users", msg.model, msg.opType, msg.element);
    //   identifyUser(dispatch);
    // });

    // return () => subscription.unsubscribe();
  }, []);

  async function loadResources() {
    const currUser = await identifyUser(dispatch);
    fetchUserGroceryLists(dispatch, currUser);
  }

  function goToAllGroceryList() {
    return props.navigation.push("AllGroceryLists");
  }
  function goToNewGroceryList() {
    return props.navigation.push("NewList");
  }

  return (
    <View style={styles.container}>
      {groceryLists.length ===0 ?
        displayInstructions()
        :displayUserGroceryLists()
      }
      <RoundButton
        onPress={() => goToNewGroceryList()}
        name="plus-circle"
        color={blue}
        style={styles.bottom}
        size={40}
      />
      <RoundButton
        onPress={() => goToAllGroceryList()}
        name="feature-search-outline"
        color={blue}
        style={styles.bottom}
        size={40}
      />
    </View>
  );

  function goToList(groceryList) {
    return props.navigation.push("ProductCategory", { groceryList });
  }
  function displayInstructions() {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}> Create your first grocery list by clicking on the + icon or browse existing lists by pressing the Search icon !</Text>
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
              onPress={() =>
                removeGroceryListFromUser(glist.id, user, dispatch)
              }
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
  groceryLists: state.groceryLists,
  user: state.user,
});

export default connect(mapStateToProps)(Home);
// export default Home;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center"
  },
  container: {
    flex: 1,
    padding: 20,
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
