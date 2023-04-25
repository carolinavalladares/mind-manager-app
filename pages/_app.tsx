import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import AuthContextProvider from "@/contexts/AuthContext";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable}`}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </div>
  );
}
