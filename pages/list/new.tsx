import { useState, useRef } from "react";
import { List, Task } from "@/types/types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// interface FormValues {
//   color: string;
//   title: string;
// description: string;
//   tasks: Task[];
// }

export default function Page() {
  const [values, setValues] = useState<List>({
    title: "",
    color: "",
    description: "",
    tasks: [],
  });
  const [currentTask, setCurrentTask] = useState<Task>({
    title: "",
    description: "",
    done: false,
    priority: false,
  });

  const addTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (currentTask.title == "") {
      return;
    }
    console.log(currentTask);

    const all = [...values.tasks, currentTask];

    const sorted = all.sort((a) => {
      if (a.priority == true) {
        return -1;
      } else {
        return 1;
      }
    });

    setValues({ ...values, tasks: [...sorted] });

    setCurrentTask({
      title: "",
      description: "",
      done: false,
      priority: false,
    });
  };

  const removeTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const updatedTasks = values.tasks;

    updatedTasks.splice(index, 1);

    setValues({ ...values, tasks: [...updatedTasks] });
  };

  const createList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (values.title == "") {
      return;
    }

    console.log(values);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">create new list</h1>
      </div>
      <div className="bg-white p-6">
        <form className="flex flex-col justify-center">
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm" htmlFor="title">
              List Name:
            </label>
            <input
              className="border border-slate-300 h-9 focus:border-slate-600 focus:outline-none px-4"
              type="text"
              id="title"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm" htmlFor="tasks">
              Tasks:{" "}
            </label>
            <div className="flex items-center gap-2 mb-4 ">
              <input
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, title: e.target.value })
                }
                value={currentTask.title}
                className="border border-slate-300 h-9 focus:border-slate-600 focus:outline-none px-4 flex-1 placeholder:text-sm"
                type="text"
                placeholder="add new task..."
              />
              <div
                onClick={() =>
                  setCurrentTask({
                    ...currentTask,
                    priority: !currentTask?.priority,
                  })
                }
                className="flex items-center gap-1 cursor-pointer"
              >
                <div className="border border-slate-300 h-5 w-5 flex items-center justify-center">
                  {currentTask.priority ? (
                    <div className="h-3 w-3 bg-rose-500"></div>
                  ) : null}
                </div>
                <p>Priority</p>
              </div>
              <button
                onClick={(e) => addTask(e)}
                title="add"
                className="h-9 w-9 fle items-center justify-center text-white bg-slate-600"
              >
                +
              </button>
            </div>

            {/* tasks */}
            <div>
              {values.tasks.map((task, index) => {
                return (
                  <div
                    className="border border-slate-300 py-2 px-4 flex items-center justify-between"
                    key={index}
                  >
                    <p>{task.title}</p>

                    <div className="flex items-center justify-between gap-4">
                      {task.priority && (
                        <div className="flex items-center justify-between gap-1">
                          <div className="h-3 w-3 bg-rose-600 rounded-full"></div>
                          <p className="text-sm text-rose-600">Priority</p>
                        </div>
                      )}

                      <button
                        onClick={(e) => removeTask(e, index)}
                        className="text-slate-600 hover:text-rose-600 transition-all "
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={(e) => createList(e)}
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
