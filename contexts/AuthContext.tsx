import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { User, LoginDataType, RegisterDataType } from "@/types/types";
import Router from "next/router";
import { toast } from "react-toastify";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface AuthContextType {
  user: User | undefined;
  signIn: (data: LoginDataType) => void;
  signUp: (data: RegisterDataType) => void;
  deleteAccount: () => void;
  signOut: () => void;

  checkUserAuth: () => boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const { mindManager_token: token } = parseCookies(undefined);
    if (token) {
      getUser(token);
    }
  }, []);

  const checkUserAuth = () => {
    const { mindManager_token: token } = parseCookies(undefined);

    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const getUser = async (token: string) => {
    const req = await fetch("/api/auth/user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const resp = await req.json();

    setUser(resp.user);
  };

  const signIn = async (data: LoginDataType) => {
    try {
      const loginReq = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const resp = await loginReq.json();

      if (!loginReq.ok) {
        return toast.error(resp.message);
      }

      setUser(resp.user);

      setCookie(undefined, "mindManager_token", resp.token, {
        maxAge: 60 * 60 * 2, // 2 hours
      });

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    destroyCookie(undefined, "mindManager_token");

    setUser(undefined);

    Router.push("/login");
  };

  const getToken = () => {
    const { mindManager_token: token } = parseCookies();

    return token;
  };

  const signUp = async (data: RegisterDataType) => {
    try {
      const req = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resp = await req.json();

      if (!req.ok) {
        return toast.error(resp.message);
      }

      toast.success("Registered successfully!");

      Router.push("/login");
    } catch (error) {
      return toast.error("Error registering...");
    }
  };

  const deleteAccount = async () => {
    const token = getToken();

    if (!token) {
      return Router.push("/login");
    }

    try {
      const req = await fetch("/api/auth/delete_account", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resp = await req.json();

      if (!req) {
        return toast.error(resp.message);
      }

      destroyCookie(undefined, "mindManager_token");
      setUser(undefined);

      Router.push("/");

      return toast.success("Account deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUp,
        deleteAccount,

        checkUserAuth,
      }}
    >
      <div>{children}</div>
    </AuthContext.Provider>
  );
}
