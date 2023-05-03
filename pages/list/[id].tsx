import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { List, Task } from "@/types/types";
import { RiErrorWarningLine } from "react-icons/ri";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import Router from "next/router";

interface Props {
  list: List;
}

export default function Page({ list }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const listTasks = JSON.parse(list.tasks);
    setTasks(listTasks);
  }, []);

  const markAsComplete = async (index: number, task: Task) => {
    const listTasks = tasks;

    listTasks.splice(index, 1, { ...task, done: !task.done });

    const newListData = {
      title: list.title,
      id: list.id,
      color: list.color,
      description: list.description,
      tasks: JSON.stringify(listTasks),
    };

    const { mindManager_token: token } = parseCookies(undefined);

    if (!token) {
      toast.warn("please login again");
      return Router.push("/");
    }

    const req = await fetch("/api/list/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newListData),
    });

    const resp = await req.json();

    console.log(resp);

    if (!req.ok) {
      return toast.error("error marking task as complete, please try again...");
    }

    setTasks([...listTasks]);
  };

  const deleteList = async () => {
    const { mindManager_token: token } = parseCookies(undefined);

    if (!token) {
      toast.warn("please login again");
      return Router.push("/");
    }

    const reqBody = {
      id: list.id,
    };

    const req = await fetch(`/api/list/delete?id=${list.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });

    const resp = await req.json();
    console.log(resp);

    if (!req.ok) {
      return toast.error("failed to delete");
    }

    toast.success("list successfully deleted");

    return Router.push("/dashboard");
  };

  return (
    <div style={{ backgroundColor: list.color }} className="p-2 rounded-md">
      <div className="bg-white rounded-md p-4">
        <div className="mb-4">
          <h1 className="text-lg font-bold">{list.title}</h1>
        </div>
        <div>
          <ul>
            {tasks &&
              tasks.map((task, index) => {
                return (
                  <div
                    className="mb-2 flex items-center justify-between border-t pt-2"
                    key={index}
                  >
                    <p className={`${task.done && "line-through"}`}>
                      {task.title}
                    </p>

                    <div className="flex items-center gap-2">
                      {task.priority && (
                        <div title="priority" className="text-rose-500">
                          <RiErrorWarningLine />
                        </div>
                      )}

                      <div>
                        <input
                          onChange={() => markAsComplete(index, task)}
                          style={{ accentColor: list.color }}
                          type="checkbox"
                          checked={task.done}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </ul>
        </div>
      </div>

      <p className="text-center py-2">
        <button
          onClick={deleteList}
          className="text-sm text-red-600 hover:underline"
        >
          Delete List
        </button>
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { mindManager_token: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const listId = Number(ctx.params?.id);
  console.log(listId);

  const prisma = new PrismaClient();

  const list = await prisma.list.findFirst({ where: { id: listId } });
  return {
    props: {
      list,
    },
  };
};
