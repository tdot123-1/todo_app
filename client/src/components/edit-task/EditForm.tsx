import { useNavigate } from "react-router-dom";
import { FetchedData, Task } from "../../types";
import TaskForm from "../form/TaskForm";
import { useContext, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";

interface EditFormProps {
  task: Task;
}

const EditForm = ({ task }: EditFormProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const [isLoading, setIsLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setEditError("");

    const formData = new FormData(event.currentTarget);
    const rawTask = Object.fromEntries(formData.entries());
    console.log("Raw task: ", rawTask);

    const taskUpdate = {
      ...rawTask,
      priority: rawTask.priority ? parseInt(rawTask.priority as string) : null,
      deadline: rawTask.deadline ? rawTask.deadline : null,
    };

    const endpoint = `/tasks/${task.id}`;

    console.log("Task Submitted: ", taskUpdate);

    try {
      const data: FetchedData = await fetchWithToken(
        endpoint,
        "PATCH",
        taskUpdate
      );

      if (!data.success || !data.data) {
        if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Error editing task: ${data.status}`);
      }

      // check if correct data was returned
      if ("id" in data.data) {
        console.log("Task updated");
        navigate(`/tasks/${data.data.id}`);
      } else {
        throw new Error(`Incorrect data type returned: ${data.status}`);
      }
    } catch (error) {
      console.error("Error updating task: ", error);
      setEditError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          error={editError}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default EditForm;
