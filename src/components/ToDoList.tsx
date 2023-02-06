import { useState, FC, useEffect } from "react";
import { TbGridDots } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

const ToDoList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          { id: 1, description: "Salir a correr", completed: false },
          {
            id: 2,
            description: "Comprar cosas del mercado",
            completed: false,
          },
          { id: 3, description: "Junta de trabajo", completed: false },
        ];
  });

  const handleAddTask = (description: string) => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, description, completed: false },
    ]);
  };

  const handleCompleteTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container mx-auto px-5 py-10 flex flex-col gap-12 ">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <TbGridDots className="text-3xl" />
          <h1 className="text-3xl font-bold ">Lista de tareas</h1>
        </div>
        <div className="flex gap-6 justify-between">
          <input
            type="text"
            placeholder="Agregar tarea"
            className="border border-gray-300 rounded-2xl py-4 px-8 w-full dark:bg-slate-800 dark:border-neutral-600"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!e.currentTarget.value) {
                  alert("El campo no puede estar vacío");
                  return false;
                }
                handleAddTask(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            className=" bg-emerald-500 text-white px-8 py-4 rounded-2xl flex items-center gap-1 pl-6"
            onClick={() => {
              const input = document.querySelector(
                'input[type="text"]'
              ) as HTMLInputElement;
              if (input) {
                if (input.value.trim() === "") {
                  alert("El campo no puede estar vacío");
                  return false;
                }
                handleAddTask(input.value);
                input.value = "";
              }
            }}
          >
            <IoIosAdd className="text-3xl" />
            Agregar
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-6 items-center overflow-y-auto h-[1100px] px-5 py-10">
        {tasks
          .sort((a, b) => b.id - a.id)
          .map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center rounded-2xl shadow-md bg-slate-200 px-8 py-4 gap-3 w-full dark:bg-slate-900"
            >
              <span
                className={`${
                  task.completed ? "line-through" : ""
                }  break-words p-2 w-3/4`}
              >
                {task.description}
              </span>
              <div className="flex gap-3 flex-wrap justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
                  onClick={() => handleCompleteTask(task.id)}
                >
                  {task.completed ? (
                    <MdCheckCircle className="text-2xl" />
                  ) : (
                    <BsCheckCircle
                      className={`${
                        task.completed ? "Reabrir" : "Completar"
                      } text-2xl`}
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 "
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <AiFillDelete className="text-2xl" />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ToDoList;
