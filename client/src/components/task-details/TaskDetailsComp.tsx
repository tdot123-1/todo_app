import { useEffect, useState } from "react";
import { Task } from "../../types";
import { Button } from "../button/Button";

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
      {taskData ? (
        <div>
          <h2>{taskData.title}</h2>
          <div>
            <p>{taskData.description}</p>
          </div>
          <div>
            <p>Priority</p>
            <p>{taskData.priority}</p>
          </div>
          <div>
            <p>Deadline</p>
            <p>{taskData.deadline}</p>
          </div>
          <div>
            <p>Created</p>
            <p>{taskData.created}</p>
          </div>
          <div>
            <p>Updated</p>
            <p>{taskData.updated}</p>
          </div>
          <div>
            <Button>Edit Task</Button>
            <Button variant="success">Finish Task</Button>
            <Button variant="danger">Delete Task</Button>
          </div>
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
};

export default TaskDetailsComp;
