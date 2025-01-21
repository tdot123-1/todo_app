import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { IconTrash } from "@tabler/icons-react";
import { theme } from "../../styles";
import { useContext, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { FetchedData } from "../../types";

interface DeleteTaskButtonProps {
  taskId: string;
}

const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsLoading(true);

    const endpoint = `/tasks/${taskId}`;

    try {
      const data: FetchedData = await fetchWithToken(endpoint, "DELETE");

      if (!data.success) {
        console.error("Error deleting task: ", data.status);
        if (data.status === 404) {
          return navigate("/task-not-found");
        } else if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Error deleting task: ${data.status}`);
      }

      console.log("Task deleted");
      navigate("/tasks", { replace: true });

      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      // if (response.ok) {
      //   console.log("Task deleted");
      //   navigate("/tasks", { replace: true });
      // } else {
      //   console.error("Error deleting task: ", response.status);
      // }
    } catch (error) {
      console.error("Failed to delete task: ", error);
      // show error message
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleDelete} variant={`danger`} disabled={isLoading}>
        <ButtonContent>
          <IconTrash size={theme.iconSizes.button} />
          <span>Delete</span>
        </ButtonContent>
      </Button>
    </>
  );
};

export default DeleteTaskButton;
