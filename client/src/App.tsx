import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <AllTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId/edit"
            element={
              <PrivateRoute>
                <EditTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/create"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
