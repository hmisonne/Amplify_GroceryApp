import { Share } from "react-native";

export const grey = '#5c626b'
export const lightGrey = '#ccc'
export const white = '#fff'
export const blue = '#04afea'
export const green = '#04e5d4'
export const blueGreen = '#04ccde'
export const mainColor = "#ffca18"
export const secondaryColor = "#525252"

export const onShare = async (text) => {
  try {
    const result = await Share.share({
      message: text,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const categories = [
    { name: "Produce", img: "food-apple", key:1 },
    { name: "Grains", img: "barley", key:2 },
    { name: "Dairy", img: "cup", key:3 },
    { name: "Meat", img: "cow", key:4 },
    { name: "Frozen", img: "cube-outline", key:5 },
    { name: "Baking", img: "muffin" , key:6},
    { name: "Canned", img: "hockey-puck", key:7 },
    { name: "Drinks", img: "glass-cocktail", key:8 },
    { name: "Other", img: "food-variant" , key:9},
  ];


export const productCategory = {
  Produce:{
    picture: "food-apple",
    key: 1
  },
  Grains: {
    picture: "barley",
    key: 2
  },
  Dairy: {
    picture: "cup",
    key: 3
  },
  Meat: {
    picture: "cow",
    key: 4
  },
  Frozen: {
    picture: "cube-outline",
    key: 5
  },
  Baking: {
    picture: "muffin",
    key: 6
  },
  Canned: {
    picture: "hockey-puck",
    key: 7
  },
  Drinks: {
    picture: "glass-cocktail",
    key: 8
  },
  Other: {
    picture: "food-variant",
    key: 9
  },
}