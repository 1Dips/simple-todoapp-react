import { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";

interface task {
  id: number;
  text: string;
  primary: boolean;
  classes: string;
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        text: string;
        primary: boolean;
      }[]
    >
  >;
  tasks: {
    id: number;
    text: string;
    primary: boolean;
  }[];
}

const Task = (task: task) => {
  const [style, setStyle] = useState(task.classes);

  const [stylePrimary, setStylePrimary] = useState(task.primary);
  const [ref, bounds] = useMeasure();
  const [state, toggle] = useState(false);
  const x = useSpring({
    from: { width: 0 },
    to: state ? { width: bounds.width } : { width: 0 },
    config: { duration: 500 },
  });

  const handleClick = (task: task) => {
    toggle(!state);
    if (state === false) {
      setTimeout(() => handleDelete(task), 3000);
    }
    return;
  };

  const handleDelete = (task: task) => {
    if (state === true) {
      return;
    }
    task.setTasks(
      task.tasks.filter((currentTask) => {
        return currentTask.id !== task.id;
      })
    );
  };
  const handleDoubleClick = () => {
    if (!stylePrimary) {
      setStyle(
        "bg-purple-800 text-white  font-bold p-5 mt-4 text-xl flex justify-between transition-all duration-100 ease-in-out test break-words"
      );
      setStylePrimary(!stylePrimary);
    } else {
      setStyle(
        "bg-purple-600 text-white rounded-lg p-5 mt-4 text-xl flex justify-between transition-all duration-100 ease-in-out test break-words"
      );
      setStylePrimary(!stylePrimary);
    }
  };

  return (
    <animated.div>
      <li className={style} onDoubleClick={handleDoubleClick}>
        <h1>
          <span className="relative inline-block">
            <animated.div
              style={x}
              className="inline-block absolute left-0 top-2/4 border-solid border-t-4 w-full border-gray-500"
            ></animated.div>{" "}
            <animated.div ref={ref}>{task.text}</animated.div>
          </span>
        </h1>
        <button
          aria-label="Delete task"
          className="text-red-500"
          onClick={() => handleClick(task)}
        >
          {stylePrimary ? "" : "×"}
        </button>
      </li>
    </animated.div>
  );
};

export default Task;
