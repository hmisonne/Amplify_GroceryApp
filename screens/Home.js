import React, { useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import { useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import { identifyUser } from '../utils/api'
import { connect, useDispatch } from "react-redux";
import store from "../src/redux/store";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RoundButton from "../components/RoundButton";
import { removeGroceryListFromUser, fetchUserGroceryLists } from '../utils/api'

const Home = (props) => {
  const dispatch = useDispatch();
  const { groceryLists, user } = store.getState();
  useEffect(() => {
    loadResources()
    // const subscription = DataStore.observe(User).subscribe((msg) => {
    //   console.log("sync users", msg.model, msg.opType, msg.element);
    //   identifyUser(dispatch);
    // });

    // return () => subscription.unsubscribe();
  }, []);

  
  async function loadResources(){
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
      {displayUserGroceryLists()}
      <RoundButton
              onPress={() => goToNewGroceryList()}
              name="plus-circle"
              color="blue"
              size={40}
              style={styles.bottom}
            />
    </View>
  );

  function goToList(groceryList) {
    return props.navigation.push("ProductCategory", { groceryList });
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
              onPress={() => removeGroceryListFromUser(glist.id, user, dispatch)}
              name="minus-circle"
              color="red"
              
            />
          </View>
        ))}
      </View>
    );
  }
  
};

const mapStateToProps = (state) => ({
  groceryLists: state.groceryLists,
  user: state.user
});

export default connect(mapStateToProps)(Home);
// export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    marginBottom: 36
  }
});

{/* <View style={styles.container}>
      
      <SubmitBtn title="Saved List(s)" onPress={goToSavedGroceryList} />
      <SubmitBtn title="New List" onPress={goToNewGroceryList} />
      <SubmitBtn title="Browse Lists" onPress={goToAllGroceryList} />
    </View> */}