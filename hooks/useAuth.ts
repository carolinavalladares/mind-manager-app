import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function useAuth() {
  const { user, signIn, signOut, signUp, deleteAccount, checkUserAuth } =
    useContext(AuthContext);

  return {
    user,
    signIn,
    signOut,
    signUp,
    deleteAccount,
    checkUserAuth,
  };
}
