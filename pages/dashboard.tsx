import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";

export default function Page() {
  const { deleteAccount } = useAuth();

  return (
    <div className="flex flex-col min-h-[650px]">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg ">My Lists</h2>

          <Link
            title="new list"
            className="text-sm hover:underline"
            href={"/list/new"}
          >
            New List
          </Link>
        </div>
        <div>
          {/* empty state */}
          <div className="flex items-center justify-center text-slate-600 h-60">
            No Lists Yet....
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={deleteAccount}
          className="text-xs text-rose-700 hover:underline"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { mindManager_token: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};
