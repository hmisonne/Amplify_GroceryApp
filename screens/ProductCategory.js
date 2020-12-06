import * as React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { categories, mainColor } from "../utils/helpers";


const ProductCategory = ({navigation, route}) => {
    const { category, updateCategory } = route.params
    const [categorySelected, setCategorySelected] = React.useState(category);

    ;
    return (
        categories.map(cat => 
            <TouchableOpacity 
                style = {categorySelected == cat.name ? styles.backgroundRow : styles.notSelected}
                onPress = {() => {
                    setCategorySelected(cat.name)
                    updateCategory(cat.name) 
                    navigation.goBack()
                }}
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
    notSelected: {
        backgroundColor: '#F1F1F0',
    }
  });
  
