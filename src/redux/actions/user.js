export const authentificateUser = (user) => ({
  type: "AUTHENTIFICATE_USER",
  user,
});

export const addListToUser = (newGroceryListID) => ({
  type:"ADD_GROCERYLIST_TO_USER",
  newGroceryListID
})