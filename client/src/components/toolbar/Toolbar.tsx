import { QueryOptions, Task } from "../../types";

import { ToolbarWrapper } from "../tasks-list/TasksList.styles";
import SortTasks from "../sort-tasks/SortTasks";
import ClearCompletedButton from "../clear-completed-tasks/ClearCompletedButton";
import Searchbar from "../search/Searchbar";

interface ToolbarProps {
  queryOptions: QueryOptions;
  tasks: Task[];
  refetch: () => void;
  displayTools: boolean;
}

const Toolbar = ({
  queryOptions,
  tasks,
  refetch,
  displayTools,
}: ToolbarProps) => {
  //   const [displayTools, setDisplayTools] = useState(false);

  //   const handleDisplayTools = () => {
  //     setDisplayTools((prev) => !prev);
  //   };

  return (
    <>
      {displayTools && (
        <>
          <ToolbarWrapper>
            <SortTasks queryOptions={queryOptions} />
            <ClearCompletedButton tasks={tasks} refetch={refetch} />
          </ToolbarWrapper>
          <Searchbar queryOptions={queryOptions} />
        </>
      )}
    </>
  );
};

export default Toolbar;
