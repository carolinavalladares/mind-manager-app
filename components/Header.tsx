import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className=" py-5 shadow-md bg-white">
      <div className="flex items-center justify-between max-w-screen-lg m-auto px-4">
        <Link title="home" href={"/"}>
          <h2>Mind Manager</h2>
        </Link>

        {user ? (
          <p>{user.username}</p>
        ) : (
          <Link title="login" className="text-sm" href={"/login"}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
