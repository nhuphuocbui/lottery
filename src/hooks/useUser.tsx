import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthProvider";
import { useLocalStorage } from "./useLocalStorage";

// NOTE: optimally move this into a separate file
export interface User {
  name?: string;
  email: string;
  role?: string;
  authToken?: string;
}

export const useUser = () => {
  const { user, setUserValue } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUserValue(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUserValue(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};
