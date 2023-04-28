import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { MdLogout } from "react-icons/md";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className=" py-5 shadow-md bg-white">
      <div className="flex items-center justify-between max-w-screen-lg m-auto px-4">
        <Link title="home" href={"/"}>
          <h2>Mind Manager</h2>
        </Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <Link title="dashboard" className="text-sm" href={`/dashboard`}>
              {user.username}
            </Link>
            <button
              title="sign out"
              className="flex flex-col justify-center items-center"
              onClick={signOut}
            >
              <MdLogout />
              <p className="text-xs">sign out</p>
            </button>
          </div>
        ) : (
          <Link title="login" className="text-sm" href={"/login"}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
