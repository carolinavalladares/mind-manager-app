import Link from "next/link";

export default function Page() {
  return (
    <div>
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
  );
}
