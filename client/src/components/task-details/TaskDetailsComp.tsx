import { useContext, useEffect, useState } from "react";
import { FetchedData, Task, TaskPriority } from "../../types";
import { Button } from "../button/Button";
import { DetailsTextBox, TaskDetailsCard, Wrapper } from "./TaskDetails.styles";
import { ButtonContainer, ButtonContent } from "../button/Button.styles";
import { Link, useNavigate } from "react-router-dom";
import DeleteTaskButton from "../delete-task/DeleteTaskButton";
import FetchError from "../fetch-error/FetchError";
import Loading from "../loading/Loading";
import {
  IconArrowBack,
  IconCheckbox,
  IconClipboardSearch,
} from "@tabler/icons-react";
import FinishTaskButton from "../finish-task/FinishTaskButton";
import { theme } from "../../styles";
import { CheckBoxWrapper } from "../tasks-list/TaskListItem.styles";
import { SessionContext } from "../../contexts/SessionContext";
import EditForm from "../edit-task/EditForm";

interface TaskDetailsCompProps {
  taskId: string;
  edit?: boolean;
}

const TaskDetailsComp = ({ taskId, edit }: TaskDetailsCompProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const [taskData, setTaskData] = useState<Task>();
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchTask = async () => {
    setError(false);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const endpoint = `/tasks/${taskId}`;

    try {
      const data: FetchedData = await fetchWithToken(endpoint);

      if (!data.success) {
        console.error("Error fetching task: ", data.status);
        if (data.status === 404) {
          return navigate("/task-not-found");
        } else if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Error fetching task: ${data.status}`);
      }

      // check if correct data type
      if (data.data && "id" in data.data) {
        setTaskData(data.data);
      } else {
        throw new Error(`Incorrect data type returned: ${data.status}`);
      }
    } catch (error) {
      setError(true);
      console.error("Failed to fetch task: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <FetchError handleRetry={handleRetry} />
      </>
    );
  }

  if (edit) {
    return <>{taskData ? <EditForm task={taskData} /> : <Loading />}</>;
  }

  return (
    <>
      <Wrapper>
        {taskData ? (
          <TaskDetailsCard>
            {taskData.completed && (
              <CheckBoxWrapper>
                <IconCheckbox
                  size={theme.iconSizes.md}
                  color={theme.primaryColor}
                />
              </CheckBoxWrapper>
            )}
            <div>
              <h2>{taskData.title}</h2>
              <div style={{ marginBottom: "1rem" }}>
                <p>{taskData.description}</p>
              </div>
              <DetailsTextBox>
                <p>Priority:</p>
                <p>{TaskPriority[taskData.priority]}</p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Deadline:</p>
                <p>
                  {taskData.deadline
                    ? new Date(taskData.deadline).toLocaleDateString()
                    : "N/A"}
                </p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Created:</p>
                <p>
                  {taskData.created
                    ? new Date(taskData.created).toLocaleDateString()
                    : "N/A"}
                </p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Updated:</p>
                {taskData.updated
                  ? new Date(taskData.updated).toLocaleDateString()
                  : "N/A"}
              </DetailsTextBox>
              <ButtonContainer>
                <Button>
                  <Link to={`/tasks/${taskData.id}/edit`}>
                    <ButtonContent>
                      <IconClipboardSearch size={theme.iconSizes.button} />
                      <span>Edit</span>
                    </ButtonContent>
                  </Link>
                </Button>
                <FinishTaskButton
                  isFinished={taskData.completed}
                  taskId={taskData.id}
                />
                <DeleteTaskButton taskId={taskData.id} />
              </ButtonContainer>
            </div>
          </TaskDetailsCard>
        ) : (
          <Loading />
        )}
      </Wrapper>
      <Wrapper>
        <Link to={`/tasks`}>
          <Button variant={`secondary`}>
            <ButtonContent>
              <IconArrowBack size={20} />
              <span>Return</span>
            </ButtonContent>
          </Button>
        </Link>
      </Wrapper>
    </>
  );
};

export default TaskDetailsComp;
