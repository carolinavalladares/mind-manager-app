import { useState, useEffect } from "react";
import { List, Task } from "@/types/types";
import { MdPriorityHigh } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";

import Link from "next/link";

interface Props {
  list: List;
}

export default function ListPreview({ list }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksJson = JSON.parse(list.tasks);

    setTasks(tasksJson);
  }, [list]);

  return (
    <div
      style={{ backgroundColor: list.color, border: `1px solid ${list.color}` }}
      className="pt-2 rounded-t-sm  max-w-[200px] w-[200px]"
    >
      <div className="bg-white rounded-t-sm p-2 h-full flex flex-col ">
        <p className=" border-b mb-2">{list.title}</p>

        <div className="flex-1 relative">
          <ul>
            {tasks.map((task, index) => {
              if (index <= 4) {
                return (
                  <li key={index} className="text-sm mb-1">
                    <div className="flex items-center justify-between">
                      <p className={`${task.done && "line-through"}`}>
                        {task.title}
                      </p>
                      <div>
                        {task.priority && (
                          <div className="text-rose-600">
                            <MdPriorityHigh />
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              } else {
                return;
              }
            })}
          </ul>

          {tasks.length > 5 && (
            <div>
              <div className="text-xs text-gray-500">
                {tasks.length - 5} more tasks
              </div>
            </div>
          )}
        </div>

        <div className="border-t flex items-center justify-end pt-1">
          <Link
            title="see full list"
            href={{ pathname: `/list/${list.id}` }}
            className="text-sm hover:underline flex items-center justify-center gap-1"
          >
            <span>See full list</span>

            <GrTextAlignFull />
          </Link>
        </div>
      </div>
    </div>
  );
}
