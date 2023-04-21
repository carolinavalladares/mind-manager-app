import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center text-lg">Welcome to Project Manager</h1>
      <Link
        title="register"
        className="block mt-4 text-sm bg-slate-400 px-4 py-2 text-slate-100 font-semibold"
        href={"register"}
      >
        Join now
      </Link>
    </main>
  );
}
