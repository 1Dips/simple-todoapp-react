import Task from "./Task";
import { useState } from "react";

const test = [
  {
    id: 1,
    text: "This is a test",
    primary: true,
  },
  {
    id: 2,
    text: "This is a test1",
    primary: false,
  },
  {
    id: 3,
    text: "This is a test2",
    primary: false,
  },
];

const Header = () => {
  const [Tasks, setTasks] = useState(test);
  const [TaskData, setTaskData] = useState("");
  const generateRandom = () => {
    return Math.floor(Math.random() * 10000);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!(TaskData.split(" ").join("") !== "")) {
      return;
    }
    setTasks([
      ...Tasks,
      { id: generateRandom(), text: TaskData, primary: false },
    ]);
    setTaskData("");
  };

  return (
    <div className="flex justify-around content-center flex-wrap h-screen">
      <div className="bg-purple-50 w-2/4 flex-col justify-center content-center p-32 pt-32  text-black rounded-lg text-center absolute ">
        <p className="absolute top-0 left-0 right-0 mt-4 text-gray-500 ">
          This is a simple todo list WITHOUT backend made <br /> with 💕 by dips
        </p>
        <div className="">
          <form>
            <input
              type="text"
              className="p-3 w-3/6 rounded-l-lg border-0"
              placeholder="Wash the dishes"
              onChange={(e) => {
                setTaskData(e.target.value);
              }}
              value={TaskData}
            />
            <button
              type="submit"
              onClick={(e) => {
                handleClick(e);
              }}
              className="bg-gradient-to-r text-white p-3 rounded-r-lg font-bold from-purple-800 to-purple-900"
            >
              Add Task{" "}
            </button>
          </form>
        </div>
        <ol className="flex flex-col">
          {Tasks.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                text={task.text}
                primary={task.primary}
                classes={
                  task.primary
                    ? "bg-purple-800 text-white  font-bold p-5 mt-4 text-xl flex justify-between "
                    : "bg-purple-600 text-white rounded-lg p-5 mt-4 text-xl flex justify-between "
                }
                setTasks={setTasks}
                tasks={Tasks}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Header;
