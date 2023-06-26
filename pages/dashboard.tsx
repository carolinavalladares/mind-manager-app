import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import { List } from "@/types/types";
import ListPreview from "@/components/ListPreview";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
  const { deleteAccount } = useAuth();
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const { mindManager_token: token } = parseCookies(undefined);

    try {
      const req = await fetch("/api/list/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resp = await req.json();

      setLists(resp.lists);

      console.log(resp.lists);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg ">My Lists</h2>

          <Link
            title="new list"
            className="text-lg  flex items-center justify-center bg-slate-800 text-white p-2 rounded-sm"
            href={"/list/new"}
          >
            <AiOutlinePlus />
          </Link>
        </div>

        {lists.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-4">
            {lists.map((list) => {
              return <ListPreview key={list.id} list={list} />;
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center text-slate-600 h-60">
            No Lists Yet....
          </div>
        )}
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
