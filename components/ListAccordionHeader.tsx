import React from "react";


import { List, Divider } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";

interface Props {
    expandedAll: boolean;
    handlePress: () => void;
}
const ListAccordionHeader: React.FC<Props> = ({ expandedAll, handlePress }) => {
    return (
        <View>
            <List.Item
                title="Categories"
                titleStyle={{ fontWeight: "bold" }}
                onPress={handlePress}
                right={props =>
                    <Ionicons
                        {...props}
                        style={{ marginRight: 5, marginVertical: 5 }}
                        name={expandedAll ? "ios-arrow-up" : "ios-arrow-down"} size={24} color="black" />
                }
            />
            <Divider
                style={{ height: 2 }}
            />
        </View>

    )
}

export default ListAccordionHeader;