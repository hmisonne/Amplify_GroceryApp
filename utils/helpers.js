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


export const productCategory = {
  Produce:{
    picture: "food-apple",
    name: "Produce",
    key: 'Produce'
  },
  Grains: {
    picture: "barley",
    name: "Pasta & Grains",
    key: 'Grains'
  },
  Dairy: {
    picture: "cup",
    name: "Dairy",
    key: 'Dairy'
  },
  Meat: {
    picture: "cow",
    name: "Meat",
    key: 'Meat'
  },
  Sea:{ 
    name: "Sea Food", 
    picture: "fish" , 
    key:'Sea'
  },
  Frozen: {
    picture: "cube-outline",
    name: "Frozen",
    key: 'Frozen'
  },
  Baking: {
    picture: "muffin",
    name: "Bakery",
    key: 'Baking'
  },
  Canned: {
    picture: "hockey-puck",
    name: "Canned",
    key: 'Canned'
  },
  Drinks: {
    picture: "glass-cocktail",
    name: "Beverages",
    key: 'Drinks'
  },
  Health:{ 
    picture: "bandage", 
    name: "Health & Personal Care", 
    key:"Health"
  },
  Pet:{
    name: "Pet Supplies", 
    picture: "bone",
    key:'Pet'
  },
  Cleaning:{ 
    name: "Household & Cleaning", 
    picture: "broom" , 
    key:'Cleaning'},
  Other: {
    picture: "food-variant",
    name: "Other",
    key: 'Other'
  },
}

export const sortedCategories = Object.keys(productCategory).sort()