import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import { User, LoginType } from "@/types/types";
import Router from "next/router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface AuthContextType {
  user: User | undefined;
  signIn: (data: { email: string; password: string }) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = getToken();
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

  const signIn = async (data: LoginType) => {
    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp = await loginReq.json();

    if (resp.status > 399) {
      return;
    }

    setUser(resp.user);

    setCookie(undefined, "mindManager_token", resp.token, {
      maxAge: 60 * 60 * 2, // 2 hours
    });

    Router.push("/dashboard");
  };

  const getToken = () => {
    const { mindManager_token: token } = parseCookies();

    return token;
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
}
