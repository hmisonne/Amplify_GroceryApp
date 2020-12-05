import * as React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { categories, mainColor } from "../utils/helpers";


const ProductCategory = () => {
    const [categorySelected, setCategorySelected] = React.useState("Produce");

    ;
    return (
        categories.map(cat => 
            <TouchableOpacity 
                style = {categorySelected == cat.name  && styles.backgroundRow}
                onPress = {() => setCategorySelected(cat.name)}
                key = {cat.key}>
                <List.Item
                    title={cat.name}
                    left={props => <List.Icon {...props} icon={cat.img} />}
                />
            </TouchableOpacity>
        )
    )
}

export default ProductCategory;

const styles = StyleSheet.create({
    backgroundRow: {
      backgroundColor: mainColor,
    },
  });
  
