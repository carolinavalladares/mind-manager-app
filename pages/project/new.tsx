import { useState, useRef } from "react";
import { ColumnType } from "@/types/types";
import { AiFillEdit } from "react-icons/ai";

interface FormValues {
  title: string;
  members: string[];
  columns: ColumnType[];
}

export default function Page() {
  const [values, setValues] = useState<FormValues>({
    title: "",
    members: [],
    columns: [],
  });
  const [memberInput, setMemberInput] = useState<string>("");

  const addMember = () => {
    let memberString;
    if (memberInput[0] == "@") {
      let member = Array.from(memberInput);
      member.splice(0, 1);
      memberString = member.join("");
      setMemberInput(memberString);
    } else {
      memberString = memberInput;
    }
    setValues({ ...values, members: [...values.members, `@${memberString}`] });
    setMemberInput("");
  };

  const addColumn = () => {
    setValues({
      ...values,
      columns: [...values.columns, { title: "", cards: [], color: "#aaa" }],
    });
  };

  const editColumn = (
    title: string,
    color: string,
    column: ColumnType,
    index: number
  ) => {
    let editedColumn = { ...column };

    if (title != "") {
      editedColumn = { ...editedColumn, title: title };
    }

    if (color != "") {
      editedColumn = { ...editedColumn, color: color };
    }

    let columns = values.columns;
    columns.splice(index, 1, editedColumn);

    setValues({ ...values, columns });
  };

  const createProject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (values.title == "") {
      console.log("project must have a title...");
      return;
    }
    if (values.columns.length <= 0) {
      console.log("project must have at least 1 column...");
      return;
    }

    const hasNoTitle = values.columns.find((item) => item.title == "");

    if (hasNoTitle) {
      console.log("all columns must have a title...");
      return;
    }

    console.log(values);
  };

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
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm" htmlFor="add-members">
              Members:{" "}
            </label>
            <div className="border p-4 border-slate-300">
              <div className="flex items-center mb-4">
                <input
                  onChange={(e) => setMemberInput(e.target.value)}
                  className="text-sm border-b placeholder:font-light focus:outline-none focus:border-slate-600"
                  type="text"
                  id="title"
                  placeholder="@member"
                  value={memberInput}
                />
                <button
                  onClick={addMember}
                  title="add"
                  type="button"
                  className="bg-slate-400 text-white leading-none flex items-center justify-center h-4 w-4"
                >
                  +
                </button>
              </div>
              {/* members */}
              <div>
                {values.members.map((member, index) => {
                  return (
                    <p
                      key={index}
                      className="text-sm bg-slate-100 mb-3 px-2 py-1"
                    >
                      {member}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* columns */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <label className="text-sm" htmlFor="add-columns">
                Columns:
              </label>

              <button
                type="button"
                onClick={addColumn}
                className="bg-slate-400 text-white leading-none flex items-center justify-center h-4 w-4"
              >
                +
              </button>
            </div>

            <div className="border p-4 border-slate-300 flex gap-2 overflow-x-scroll">
              {values.columns.map((column, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`column-${index} py-2  flex items-center justify-end px-2`}
                      style={{ backgroundColor: column.color }}
                    >
                      <label
                        className="cursor-pointer text-white bg-black bg-opacity-20 p-1 rounded-sm "
                        htmlFor={`colorInput-${index}`}
                      >
                        <AiFillEdit />
                      </label>
                      <div>
                        <input
                          onChange={(e) =>
                            editColumn("", e.target.value, column, index)
                          }
                          type="color"
                          name={`colorInput-${index}`}
                          id={`colorInput-${index}`}
                          className="absolute invisible"
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="title"
                        onChange={(e) =>
                          editColumn(e.target.value, "", column, index)
                        }
                        className="border focus:outline-none focus:border-slate-600 px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={(e) => createProject(e)}
            title="create"
            className="bg-slate-600 text-white h-10"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
