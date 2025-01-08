import { useEffect, useState } from "react";
import { Task } from "../../types";
import EditForm from "./EditForm";

interface EditTaskCompProps {
  taskId: string;
}

const EditTaskComp = ({ taskId }: EditTaskCompProps) => {
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
  return <>{taskData ? <EditForm task={taskData} /> : <p>Not Found</p>}</>;
};

export default EditTaskComp;
