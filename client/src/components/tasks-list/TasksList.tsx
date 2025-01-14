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
import ClearCompletedButton from "../clear-completed-tasks/ClearCompletedButton";

const TasksList = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [completedTasks, setCompletedTasks] = useState<string[]>([]);

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
    } catch (error) {
      console.error("Failed to fetch tasks data: ", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // set initial state of completed task id's on component when data is fetched
  // useEffect(() => {
  //   const newCompletedTasks = allTasks
  //     .filter((task) => task.completed)
  //     .map((task) => task.id);
  //   setCompletedTasks((prev) => [...prev, ...newCompletedTasks]);
  //   console.log("Completed tasks: ", completedTasks.length)
  // }, [allTasks]);

  // add new task id to array of completed
  // const addCompletedTask = (taskId: string) => {
  //   setCompletedTasks((prev) => [...prev, taskId]);
  // };

  // retry fetching data in case of error
  useEffect(() => {
    fetchAllTasks();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // show error state
  if (error) {
    return <FetchError handleRetry={handleRetry} />;
  }

  // show loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {allTasks.length ? (
        <>
          <ClearCompletedButton tasks={allTasks} />
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
