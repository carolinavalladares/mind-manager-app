import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { parseCookies } from "nookies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center text-lg">Welcome to Mind Manager</h1>
      <Link
        title="register"
        className="block mt-4 text-sm bg-slate-800 px-4 py-2 text-slate-100 font-semibold"
        href={"register"}
      >
        Join now
      </Link>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { mindManager_token: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
};
