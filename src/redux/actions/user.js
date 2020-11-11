import { API } from "../../../utils/api";

export const authentificateUser = (user) => ({
  type: "AUTHENTIFICATE_USER",
  user,
});

export function handleAuthentificateUser(){
  return (dispatch) => {
    return API.identifyUser()
    .then((user) => {
      dispatch(authentificateUser(user))
      console.log('result', user.groceryListID)
      return user.groceryListID
    })
  }
}