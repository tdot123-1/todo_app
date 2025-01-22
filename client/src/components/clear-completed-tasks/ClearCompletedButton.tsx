import { IconClipboardCheck } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { useContext, useEffect, useState } from "react";
import { ErrorMessage, Wrapper } from "./ClearCompletedButton.styles";
import { FetchedData, Task } from "../../types";
import { SessionContext } from "../../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

interface ClearCompletedButtonProps {
  tasks: Task[];
  refetch: () => void;
}

const ClearCompletedButton = ({
  tasks,
  refetch,
}: ClearCompletedButtonProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { fetchWithToken, handleLogout } = session;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // check if any task is marked as completed, only enable button if there is at least one
  const [completedTasks, setCompletedTasks] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCompletedTasks(tasks.some((task) => task.completed));
  }, [tasks]);

  const handleClearAll = async () => {
    setError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const completedTaskIds = tasks
      .filter((task) => task.completed)
      .map((task) => task.id);

    console.log("completed tasks: ", completedTaskIds.length);

    const endpoint = "/tasks/bulk-delete";

    try {
      const data: FetchedData = await fetchWithToken(
        endpoint,
        "DELETE",
        completedTaskIds
      );

      if (!data.success) {
        console.error("Error deleting task: ", data.status);
        if (data.status === 404) {
          return setError("No completed tasks found.");
        } else if (data.status === 401) {
          console.error("Unauthorized: ", data.status);
          handleLogout();
          return navigate("/login");
        }
        throw new Error(`Error deleting task: ${data.status}`);
      }

      console.log("Completed tasks cleared");
      refetch();
    } catch (error) {
      console.error("Error deleting tasks: ", error);
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Button onClick={handleClearAll} disabled={isLoading || !completedTasks}>
        <ButtonContent>
          <IconClipboardCheck />
          <span>Clear Completed</span>
        </ButtonContent>
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

export default ClearCompletedButton;
