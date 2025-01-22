import { IconClipboardCheck, IconClipboardX } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { theme } from "../../styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../contexts/SessionContext";
import { FetchedData } from "../../types";

interface FinishTaskButtonProps {
  isFinished: boolean;
  taskId: string;
}

// need error handling
const FinishTaskButton = ({ isFinished, taskId }: FinishTaskButtonProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinishTask = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const endpoint = `/tasks/${taskId}`;

    try {
      const data: FetchedData = await fetchWithToken(endpoint, "PATCH", {
        completed: !isFinished,
      });

      if (!data.success || !data.data) {
        if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        } else if (data.status === 404) {
          console.error("Task not found: ", data.status);
          return navigate("/task-not-found");
        }
        throw new Error(`Error finishing task: ${data.status}`);
      }

      // check if correct data was returned
      if ("id" in data.data) {
        console.log("Task finished");
        navigate(`/tasks/${data.data.id}`);
      } else {
        throw new Error(`Incorrect data type returned: ${data.status}`);
      }

      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
      //   {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ completed: !isFinished }),
      //   }
      // );

      // if (response.ok) {
      //   console.log("Success");
      //   navigate("/tasks", { replace: true });
      // } else {
      //   console.error(`Error finishing task: ${response.status}`);
      // }
    } catch (error) {
      console.error("Error finishing task: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFinished ? "secondary" : "success"}
      disabled={isLoading}
      onClick={handleFinishTask}
    >
      <ButtonContent>
        {isFinished ? (
          <>
            <IconClipboardX size={theme.iconSizes.button} />
            <span>Incomplete</span>
          </>
        ) : (
          <>
            <IconClipboardCheck size={theme.iconSizes.button} />
            <span>Complete</span>
          </>
        )}
      </ButtonContent>
    </Button>
  );
};

export default FinishTaskButton;
