import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect, useDispatch } from "react-redux";
import { View } from "react-native";
import SubmitBtn from "../components/SubmitBtn";
import { API } from "../utils/api";
import SnackBar from "../components/SnackBar";
import { handleAddGroceryList } from "../src/redux/actions/groceryList";

let UndoRedo = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  groceryList,
  user,
  visible,
  onDismissSnackBar,
}) => {
  const dispatch = useDispatch();
  function addGroceryListBack() {
    const firstIndex = groceryList.length - 1;
    const lastIndex = groceryList[firstIndex].length - 1;
    const recoveredGroceryList = groceryList[firstIndex][lastIndex];
    dispatch(handleAddGroceryList(recoveredGroceryList.id))
    onUndo();
  }

  return (
    <View>
      <SnackBar
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
        undoAction={addGroceryListBack}
        snackContent="Removed Grocery List"
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  canUndo: state.groceryLists.past.length > 0,
  canRedo: state.groceryLists.future.length > 0,
  groceryList: state.groceryLists.past,
  user: state.user,
});

const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
};

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

export default UndoRedo;
