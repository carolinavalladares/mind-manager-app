export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">create new project</h1>
      </div>
      <div className="bg-white p-6">
        <form className="flex flex-col justify-center">
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm" htmlFor="title">
              Project Name:
            </label>
            <input
              className="border border-slate-300 h-9 focus:border-slate-600 focus:outline-none px-4"
              type="text"
              id="title"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm" htmlFor="add-members">
              Members:{" "}
            </label>
            <div className="border p-4 border-slate-300">
              <div className="flex items-center">
                <input
                  className="text-sm border-b placeholder:font-light focus:outline-none focus:border-slate-600"
                  type="text"
                  id="title"
                  placeholder="@member"
                />
                <button
                  title="add"
                  className="bg-slate-400 text-white leading-none flex items-center justify-center h-4 w-4"
                >
                  +
                </button>
              </div>
              {/* members */}
              <div></div>
            </div>
          </div>

          {/* columns */}
          <div className="mb-4">columns</div>

          <button title="create" className="bg-slate-600 text-white h-10">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
