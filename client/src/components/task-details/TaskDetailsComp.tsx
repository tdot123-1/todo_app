import { useEffect, useState } from "react";
import { Task } from "../../types";
import { Button } from "../button/Button";
import { DetailsTextBox, TaskDetailsCard, Wrapper } from "./TaskDetails.styles";
import { ButtonContainer, ButtonContent } from "../button/Button.styles";
import { Link, useNavigate } from "react-router-dom";
import DeleteTaskButton from "../delete-task/DeleteTaskButton";
import FetchError from "../fetch-error/FetchError";
import Loading from "../loading/Loading";
import {
  IconArrowBack,
  IconClipboardCheck,
  IconClipboardSearch,
} from "@tabler/icons-react";

interface TaskDetailsCompProps {
  taskId: string;
}

const TaskDetailsComp = ({ taskId }: TaskDetailsCompProps) => {
  const [taskData, setTaskData] = useState<Task>();
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const navigate = useNavigate();

  const fetchTask = async () => {
    setError(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return navigate("/task-not-found");
        }
        throw new Error(`Response status: ${response.status}`);
      }

      const data: Task = await response.json();
      setTaskData(data);
    } catch (error: any) {
      setError(true);
      console.error("Failed to fetch task: ", error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (error) {
    return (
      <>
        <FetchError handleRetry={handleRetry} />
      </>
    );
  }

  return (
    <>
      <Wrapper>
        {taskData ? (
          <TaskDetailsCard>
            <div>
              <h2>{taskData.title}</h2>
              <div>
                <p>{taskData.description}</p>
              </div>
              <DetailsTextBox>
                <p>Priority</p>
                <p>{taskData.priority}</p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Deadline</p>
                <p>
                  {taskData.deadline
                    ? new Date(taskData.deadline).toLocaleString()
                    : "N/A"}
                </p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Created</p>
                <p>
                  {taskData.created
                    ? new Date(taskData.created).toLocaleString()
                    : "N/A"}
                </p>
              </DetailsTextBox>
              <DetailsTextBox>
                <p>Updated</p>
                {taskData.updated
                  ? new Date(taskData.updated).toLocaleString()
                  : "N/A"}
              </DetailsTextBox>
              <ButtonContainer>
                <Link to={`/tasks/${taskData.id}/edit`}>
                  <Button>
                    <ButtonContent>
                      <IconClipboardSearch size={20} />
                      <span>Edit</span>
                    </ButtonContent>
                  </Button>
                </Link>
                <Button variant="success">
                  <ButtonContent>
                    <IconClipboardCheck size={20} />
                    <span>Finish</span>
                  </ButtonContent>
                </Button>
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
