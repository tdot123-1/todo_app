import { IconClipboardCheck } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { useEffect, useState } from "react";
import { ErrorMessage, Wrapper } from "./ClearCompletedButton.styles";
import { Task } from "../../types";

interface ClearCompletedButtonProps {
  tasks: Task[];
  refetch: () => void;
}

//(!) update to use fetch with token /////////////////
const ClearCompletedButton = ({
  tasks,
  refetch,
}: ClearCompletedButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // check if any task is marked as completed, only enable button if there is at least one
  const [completedTasks, setCompletedTasks] = useState(false);

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
    try {
      // bulk delete array of task id's
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/bulk-delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completedTaskIds),
        }
      );

      if (response.ok) {
        console.log("Tasks deleted");
        // refetch the list of tasks after deletion
        refetch();
      } else {
        throw new Error(`Error deleting tasks: ${response.status}`);
      }
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
