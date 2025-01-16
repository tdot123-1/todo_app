import { useEffect, useState } from "react";
import { QueryOptions, Task } from "../../types";
import TaskListItem from "./TaskListItem";
import { EmptyTasksList, TasksGrid, ToolbarWrapper } from "./TasksList.styles";
import FetchError from "../fetch-error/FetchError";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import {
  IconClipboardPlus,
  IconSettingsDown,
  IconSettingsUp,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ClearCompletedButton from "../clear-completed-tasks/ClearCompletedButton";
import Pagination from "../pagination/Pagination";
import { LIMIT } from "../../constants";
import LoadingTasks from "../loading/LoadingTasks";
import { theme } from "../../styles";
import SortTasks from "../sort-tasks/SortTasks";

interface TasksListProps {
  queryOptions: QueryOptions;
}

const TasksList = ({ queryOptions }: TasksListProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [displayTools, setDisplayTools] = useState(false);

  const { page, order, sort } = queryOptions;

  const fetchAllTasks = async () => {
    setIsLoading(true);
    setError(false);

    // await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks?limit=${LIMIT}&offset=${
          LIMIT * page - LIMIT
        }&order=${order}&sort_by=${sort}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      setAllTasks(data.tasks);
      if (totalItems === null) {
        setTotalItems(data.total_count);
      }
    } catch (error) {
      console.error("Failed to fetch tasks data: ", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // retry fetching data in case of error
  useEffect(() => {
    fetchAllTasks();
  }, [retryCount]);

  const handleRetry = () => {
    setTotalItems(null);
    setRetryCount((prev) => prev + 1);
  };

  // refetch when page changes
  useEffect(() => {
    fetchAllTasks();
  }, [page, order, sort]);

  const handleDisplayTools = () => {
    setDisplayTools((prev) => !prev);
  };

  // show error state
  if (error) {
    return <FetchError handleRetry={handleRetry} />;
  }

  // show loading state
  if (isLoading) {
    return (
      <>
        <div style={{ width: "fit-content", marginBottom: "0.2rem" }}>
          <Button onClick={handleDisplayTools}>
            {displayTools ? (
              <IconSettingsUp size={theme.iconSizes.button} />
            ) : (
              <IconSettingsDown size={theme.iconSizes.button} />
            )}
          </Button>
        </div>

        {displayTools && (
          <ToolbarWrapper>
            <SortTasks sort={sort} order={order} />
            <ClearCompletedButton tasks={allTasks} refetch={handleRetry} />
          </ToolbarWrapper>
        )}
        <LoadingTasks />
        <Pagination
          queryOptions={queryOptions}
          totalItems={totalItems === null ? 0 : totalItems}
        />
      </>
    );
  }

  return (
    <>
      {allTasks.length ? (
        <>
          <div style={{ width: "fit-content", marginBottom: "0.2rem" }}>
            <Button onClick={handleDisplayTools}>
              {displayTools ? (
                <IconSettingsUp size={theme.iconSizes.button} />
              ) : (
                <IconSettingsDown size={theme.iconSizes.button} />
              )}
            </Button>
          </div>

          {displayTools && (
            <ToolbarWrapper>
              <SortTasks sort={sort} order={order} />
              <ClearCompletedButton tasks={allTasks} refetch={handleRetry} />
            </ToolbarWrapper>
          )}

          <TasksGrid>
            {allTasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </TasksGrid>
          <Pagination
            queryOptions={queryOptions}
            totalItems={totalItems === null ? 0 : totalItems}
          />
        </>
      ) : (
        <EmptyTasksList>
          <p>No tasks added yet.</p>
          <h2>Create Your First!</h2>
          <Link to={"/tasks/create"}>
            <Button>
              <ButtonContent>
                <IconClipboardPlus size={theme.iconSizes.button} />
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
