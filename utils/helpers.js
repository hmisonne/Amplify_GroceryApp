import { Share, Alert} from "react-native";

export const grey = "#5c626b";
export const lightGrey = "#ccc";
export const lightGreyBackground = "#F1F1F0";
export const white = "#fff";
export const blue = "#04afea";
export const green = "#04e5d4";
export const blueGreen = "#04ccde";
export const mainColor = "#ffca18";
export const secondaryColor = "#525252";

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
  Baby: {
    picture: "baby-bottle",
    name: "Baby",
    key: "Baby",
  },
  Baking: {
    picture: "muffin",
    name: "Bakery",
    key: "Baking",
  },
  Drinks: {
    picture: "glass-cocktail",
    name: "Beverages",
    key: "Drinks",
  },
  Canned: {
    picture: "hockey-puck",
    name: "Canned",
    key: "Canned",
  },
  Dairy: {
    picture: "cup",
    name: "Dairy",
    key: "Dairy",
  },
  Frozen: {
    picture: "cube-outline",
    name: "Frozen",
    key: "Frozen",
  },
  Meat: {
    picture: "cow",
    name: "Meat",
    key: "Meat",
  },
  Health: {
    picture: "bandage",
    name: "Health & Personal Care",
    key: "Health",
  },
  Cleaning: {
    name: "Household & Cleaning",
    picture: "broom",
    key: "Cleaning",
  },
  Other: {
    picture: "food-variant",
    name: "Other",
    key: "Other",
  },
  Grains: {
    picture: "barley",
    name: "Pasta & Grains",
    key: "Grains",
  },
  Pet: {
    name: "Pet Supplies",
    picture: "bone",
    key: "Pet",
  },
  Produce: {
    picture: "food-apple",
    name: "Produce",
    key: "Produce",
  },
  Sea: {
    name: "Sea Food",
    picture: "fish",
    key: "Sea",
  },
};

export function formatSectionListData(products) {
  const currCategories = new Set();
  products.forEach((product) => currCategories.add(product.category));
  const filteredCurrCategories = Object.keys(productCategory).filter(cat => currCategories.has(cat))
  let currListCategories = Array.from(filteredCurrCategories)
    .map((cat) => ({
      title: productCategory[cat].name,
      key: cat,
      data: products
        .filter((product) => product.category === cat)
        .sort((a, b) => {
          let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
      })
        .map((product) => ({ ...product, key: product.id })),
    }));
  return currListCategories;
}

export const createTwoButtonAlert = (callback, alertMessage, alertTitle="Warning") =>
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => callback() }
      ],
      { cancelable: false }
    );