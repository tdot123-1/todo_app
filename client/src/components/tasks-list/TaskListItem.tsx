import { Task } from "../../types";
import { TaskContainer, TaskContainerText } from "./TaskListItem.styles";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <>
      <TaskContainer>
        <div style={{ textAlign: "center" }}>
          <h2>{task.title}</h2>
        </div>
        <TaskContainerText>
          <p>Priority:</p>
          <p>{task.priority}</p>
        </TaskContainerText>
        <TaskContainerText>
          <p>Deadline:</p>
          <p>
            {task.deadline ? new Date(task.deadline).toLocaleString() : "N/A"}
          </p>
        </TaskContainerText>
      </TaskContainer>
    </>
  );
};

export default TaskListItem;
