import React from "react";

import ListAccordion from "./ListAccordion";
import { mainColor, productCategory } from "../utils/helpers";
import { ScrollView } from "react-native";
import { FAB } from "react-native-paper";
import PropTypes from "prop-types";

export default function SwipeSectionList({
  listData,
  deleteAction,
  navigateToEdit,
  onPressAction,
  toBuyView,
  fabAction,
  groceryListID,
  itemsInCart
}) {
  return (
    <ScrollView>
    {listData.map((section) => (
      <ListAccordion
        sectionTitle={section.title}
        sectionIcon={productCategory[section.key].picture}
        key={section.key}
        rowData={section.data}
        deleteAction={deleteAction}
        navigateToEdit={navigateToEdit}
        onPressAction={onPressAction}
        toBuyView={toBuyView}
      />
    ))}
    {toBuyView && listData.length > 0 && itemsInCart && (
        <FAB
          icon="clipboard-check-outline"
          label="I'm done!"
          style={{
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: mainColor,
            alignSelf: "center",
          }}
          onPress={() => fabAction(groceryListID)}
        />
      )}
  </ScrollView>
  )
}

SwipeSectionList.propTypes = {
  listData: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired,
  navigateToEdit: PropTypes.func.isRequired,
  onPressAction: PropTypes.func.isRequired,
  toBuyView: PropTypes.bool.isRequired,
  fabAction: PropTypes.func.isRequired,
  itemsInCart: PropTypes.bool.isRequired,
  groceryListID: PropTypes.string.isRequired,
};