import { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskListItem from "./TaskListItem";
import { EmptyTasksList, TasksGrid } from "./TasksList.styles";
import FetchError from "../fetch-error/FetchError";
import Loading from "../loading/Loading";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { IconClipboardPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const TasksList = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllTasks = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {allTasks.length ? (
        <>
          <TasksGrid>
            {allTasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </TasksGrid>
        </>
      ) : (
        <EmptyTasksList>
          <p>No tasks added yet.</p>
          <h2>Create Your First!</h2>
          <Link to={"/tasks/create"}>
            <Button>
              <ButtonContent>
                <IconClipboardPlus size={20} />
                <span>Create</span>
              </ButtonContent>
            </Button>
          </Link>
        </EmptyTasksList>
      )}
    </>
  );
};

export default TasksList;
