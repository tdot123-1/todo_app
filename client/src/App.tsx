import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/tasks/:taskId/edit" element={<EditTask />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
