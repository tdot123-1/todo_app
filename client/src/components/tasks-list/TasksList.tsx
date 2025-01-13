import { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskListItem from "./TaskListItem";
import { TasksGrid } from "./TasksList.styles";
import FetchError from "../fetch-error/FetchError";
import Loading from "../loading/Loading";

const TasksList = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAllTasks = async () => {
    setError(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      setAllTasks(data);
      // console.log(data);
    } catch (error) {
      console.error("Failed to fetch tasks data: ", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (error) {
    return <FetchError handleRetry={handleRetry} />;
  }

  return (
    <div>
      {allTasks.length ? (
        <>
          <TasksGrid>
            {allTasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </TasksGrid>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TasksList;
