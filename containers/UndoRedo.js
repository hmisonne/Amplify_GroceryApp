import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import { View } from 'react-native'
import SubmitBtn from '../components/SubmitBtn'
import { API } from '../utils/api'
import SnackbarUndo from '../components/SnackBarUndo'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo, groceryList, user, visible, onDismissSnackBar }) => {
    function addGroceryListBack() {
        const recoveredGroceryList = groceryList[groceryList.length-1][0]
        API.addGroceryListToUser(recoveredGroceryList.id, user)
        onUndo()
    }
    
    return (
        <View>
            <SnackbarUndo
                visible={visible}
                onDismissSnackBar={onDismissSnackBar}
                undoAction={addGroceryListBack}
                snackContent="Removed Grocery List"
            />

        </View>
      )
} 

const mapStateToProps = (state) => ({
  canUndo: state.groceryLists.past.length > 0,
  canRedo: state.groceryLists.future.length > 0,
  groceryList: state.groceryLists.past,
  user: state.user
})

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)

export default UndoRedo