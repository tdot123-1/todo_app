import { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskListItem from "./TaskListItem";
import { TasksGrid } from "./TasksList.styles";

const TasksList = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        setAllTasks(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch tasks data: ", error);
      }
    };

    fetchAllTasks();
  }, []);
  return (
    <div>
      {allTasks.length ? (
        <>
          <p>Success</p>
          <TasksGrid>
            {allTasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </TasksGrid>
        </>
      ) : (
        <p>Failed</p>
      )}
    </div>
  );
};

export default TasksList;
