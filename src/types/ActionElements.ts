import { GroceryList } from "../models";

export interface MenuAction {
  icon: string;
  title: string;
  validationNeeded: boolean;
  alertTitle: string;
  message: string;
  onPress: (element: GroceryList) => void;
}

export interface FabBarAction {
  icon: string;
  label: string;
  onPress: () => void;
};