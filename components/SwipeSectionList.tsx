import React from "react";

import ListAccordion from "./ListAccordion";
import { mainColor, productCategory } from "../utils/helpers";
import { ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";
import { SectionData } from "../src/types/ListElements"

interface Props {
  listData: SectionData[];
  deleteAction: () => void;
  navigateToEdit: () => void;
  onPressAction: () => void;
  toBuyView: boolean;
  fabAction: (text: string) => void;
  itemsInCart: boolean;
  groceryListID: string;
  expandedAll: boolean;
}


const SwipeSectionList: React.FC<Props> = ({
  listData,
  deleteAction,
  navigateToEdit,
  onPressAction,
  toBuyView,
  fabAction,
  groceryListID,
  itemsInCart,
  expandedAll
}) => {

  return (
    <View>
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
          expandedAll={expandedAll}
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
     
    </View>
  )
}

export default SwipeSectionList