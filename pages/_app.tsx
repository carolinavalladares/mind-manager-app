import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import AuthContextProvider from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.className}`}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <ToastContainer autoClose={3000} position="top-center" />
      </AuthContextProvider>
    </div>
  );
}
