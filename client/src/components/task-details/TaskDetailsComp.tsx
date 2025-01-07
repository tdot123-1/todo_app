import { useEffect, useState } from "react";
import { Task } from "../../types";
import { Button } from "../button/Button";
import {
  ButtonContainer,
  DetailsTextBox,
  TaskDetailsCard,
  Wrapper,
} from "./TaskDetails.styles";

interface TaskDetailsCompProps {
  taskId: string;
}

const TaskDetailsComp = ({ taskId }: TaskDetailsCompProps) => {
  const [taskData, setTaskData] = useState<Task>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/tasks/${taskId}`
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data: Task = await response.json();
        setTaskData(data);
      } catch (error) {
        console.error("Failed to fetch task: ", error);
      }
    };
    fetchTask();
  }, []);
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
                <Button>Edit Task</Button>
                <Button variant="success">Finish Task</Button>
                <Button variant="danger">Delete Task</Button>
              </ButtonContainer>
            </div>
          </TaskDetailsCard>
        ) : (
          <p>Not Found</p>
        )}
      </Wrapper>
    </>
  );
};

export default TaskDetailsComp;
