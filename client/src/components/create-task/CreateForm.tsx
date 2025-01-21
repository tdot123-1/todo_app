import { useNavigate } from "react-router-dom";
import TaskForm from "../form/TaskForm";
import { useContext, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { FetchedData } from "../../types";

const CreateForm = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const rawTask = Object.fromEntries(formData.entries());
    console.log("Raw task: ", rawTask);

    const task = {
      ...rawTask,
      priority: rawTask.priority ? parseInt(rawTask.priority as string) : null,
      deadline: rawTask.deadline ? rawTask.deadline : null,
    };

    const endpoint = "/tasks";

    console.log("Task Submitted: ", task);

    try {
      const data: FetchedData = await fetchWithToken(endpoint, "POST", task);

      if (!data.success || !data.data) {
        if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Error creating task: ${data.status}`);
      }

      // check if correct data was returned
      if ("id" in data.data) {
        console.log("Task created");
        navigate(`/tasks/${data.data.id}`);
      } else {
        throw new Error(`Incorrect data type returned: ${data.status}`);
      }
    } catch (error) {
      console.error("Error creating task: ", error);
      setCreateError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <TaskForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={createError}
        />
      </div>
    </>
  );
};

export default CreateForm;
