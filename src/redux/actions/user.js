import { identifyUser } from "../../../utils/api";

export const authentificateUser = (user) => ({
  type: "AUTHENTIFICATE_USER",
  user,
});

export function handleAuthentificateUser(){
  return (dispatch) => {
    return identifyUser()
    .then((user) => dispatch(authentificateUser(user)))
  }
}