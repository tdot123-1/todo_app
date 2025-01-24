import { useContext, useEffect, useState } from "react";
import { FetchedData, QueryOptions, Task } from "../../types";
import TaskListItem from "./TaskListItem";
import { EmptyTasksList, TasksGrid } from "./TasksList.styles";
import FetchError from "../fetch-error/FetchError";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import {
  IconClipboardPlus,
  IconSettingsDown,
  IconSettingsUp,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { LIMIT } from "../../constants";
import LoadingTasks from "../loading/LoadingTasks";
import { theme } from "../../styles";
import { SessionContext } from "../../contexts/SessionContext";
import NoResults from "../search/NoResults";
import Toolbar from "../toolbar/Toolbar";

interface TasksListProps {
  queryOptions: QueryOptions;
}

const TasksList = ({ queryOptions }: TasksListProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const navigate = useNavigate();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [displayTools, setDisplayTools] = useState(false);

  const { page, order, sort, searchQuery } = queryOptions;

  const fetchAllTasks = async () => {
    setIsLoading(true);
    setError(false);

    const endpoint = `/tasks?limit=${LIMIT}&offset=${
      LIMIT * page - LIMIT
    }&order=${order}&sort_by=${sort}&q=${searchQuery}`;

    // await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      // function will throw error if fetch failed
      // else it will return {data: Task[], total_count: int}
      const data: FetchedData = await fetchWithToken(endpoint);

      if (!data.success || !data.data) {
        if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Response was not ok: ${data.status}`);
      }

      // check if correct type of data was fetched.
      if ("tasks" in data.data && "total_count" in data.data) {
        setAllTasks(data.data.tasks);

        if (data.data.total_count === 0) {
          setTotalItems(1);
        } else {
          setTotalItems(data.data.total_count);
        }
      } else {
        throw new Error(`Error fetching task data: ${data.status}`);
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

  const handleDisplayTools = () => {
    setDisplayTools((prev) => !prev);
  };

  // refetch when page changes
  useEffect(() => {
    fetchAllTasks();
  }, [page, order, sort, searchQuery]);

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
        <Toolbar
          queryOptions={queryOptions}
          tasks={allTasks}
          refetch={handleRetry}
          displayTools={displayTools}
        />
        <LoadingTasks />
        <Pagination
          queryOptions={queryOptions}
          totalItems={totalItems === null ? 1 : totalItems}
        />
      </>
    );
  }

  // show error state
  if (error) {
    return <FetchError handleRetry={handleRetry} />;
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
          <Toolbar
            queryOptions={queryOptions}
            tasks={allTasks}
            refetch={handleRetry}
            displayTools={displayTools}
          />

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
      ) : searchQuery === "" ? (
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
      ) : (
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
          <Toolbar
            queryOptions={queryOptions}
            tasks={allTasks}
            refetch={handleRetry}
            displayTools={displayTools}
          />
          <NoResults />
          <Pagination
            queryOptions={queryOptions}
            totalItems={totalItems === null ? 0 : totalItems}
          />
        </>
      )}
    </>
  );
};

export default TasksList;
