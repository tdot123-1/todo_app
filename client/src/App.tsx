
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/tasks/:taskId/edit" element={<EditTask />} />
        <Route path="/tasks/create" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;
