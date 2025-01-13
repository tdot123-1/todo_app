import { IconClipboardCheck, IconClipboardX } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import { theme } from "../../styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FinishTaskButtonProps {
  isFinished: boolean;
  taskId: string;
}

// need error handling
const FinishTaskButton = ({ isFinished, taskId }: FinishTaskButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinishTask = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !isFinished }),
        }
      );

      if (response.ok) {
        console.log("Success");
        navigate("/tasks", { replace: true });
      } else {
        console.error(`Error finishing task: ${response.status}`);
      }
    } catch (error) {
      console.error("Error finishing task: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={isFinished ? "secondary" : "success"} disabled={isLoading} onClick={handleFinishTask}>
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
