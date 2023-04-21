import Link from "next/link";

export default function Header() {
  return (
    <header className=" py-5 shadow-md bg-white">
      <div className="flex items-center justify-between max-w-screen-lg m-auto">
        <Link title="home" href={"/"}>
          <h2>Project Manager</h2>
        </Link>

        <Link title="login" className="text-sm" href={"/login"}>
          Login
        </Link>
      </div>
    </header>
  );
}
