import { Link } from "react-router-dom";
import { Task, TaskPriority } from "../../types";
import {
  CheckBoxWrapper,
  TaskContainer,
  TaskContainerText,
} from "./TaskListItem.styles";
import { IconCheckbox } from "@tabler/icons-react";
import { theme } from "../../styles";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <>
      <Link to={`/tasks/${task.id}`}>
        <TaskContainer>
          {task.completed && (
            <CheckBoxWrapper>
              <IconCheckbox
                size={theme.iconSizes.md}
                color={theme.primaryColor}
              />
            </CheckBoxWrapper>
          )}

          <div style={{ textAlign: "center" }}>
            <h2>{task.title}</h2>
          </div>
          <TaskContainerText>
            <p>Priority:</p>
            <p>{TaskPriority[task.priority]}</p>
          </TaskContainerText>
          <TaskContainerText>
            <p>Deadline:</p>
            <p>
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString()
                : "N/A"}
            </p>
          </TaskContainerText>
        </TaskContainer>
      </Link>
    </>
  );
};

export default TaskListItem;
