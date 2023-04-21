import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg ">My Projects</h2>

        <Link
          title="new project"
          className="text-sm hover:underline"
          href={"/project/new"}
        >
          New Project
        </Link>
      </div>
      <div>
        {/* empty state */}
        <div className="flex items-center justify-center text-slate-600 h-60">
          No Projects Yet....
        </div>
      </div>
    </div>
  );
}
