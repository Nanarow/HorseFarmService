import { Route, Routes } from "react-router-dom";
import {
  Course,
  CourseSetting,
  Employee,
  Food,
  Health,
  Home,
  Horse,
  Loading,
  Login,
  NoPage,
  Stable,
  Tour,
  User,
} from "./pages";
import PrivateRoute from "./components/privateRoute";
import ValidateForm from "./examples/form-with-validation";
import DragDropTable from "./examples/drag-drop-table";
import EmployeeList from "./components/Employee/EmployeeList";
import UserList from "./components/User/UserList";
import StableList from "./components/Stable/StableList";
import StablePage from "./pages/stable";
import Support from "./pages/support";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NoPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/loading/:page" element={<Loading />} />
      <Route path="/login/admin" element={<Login role="admin" />} />
      <Route path="/login/employee" element={<Login role="employee" />} />
      <Route path="/login" element={<Login role="user" />} />

      <Route path="/example/form" element={<ValidateForm />} />
      <Route path="/example/table" element={<DragDropTable />} />

      <Route element={<PrivateRoute role={101} path="/login" />}>
        <Route path="/course" element={<Course />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/support" element={<Support />} />
      </Route>

      <Route element={<PrivateRoute role={100} path="/login/admin" />}>
        <Route path="/employee/list" element={<EmployeeList />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/list" element={<UserList />} />
      </Route>

      <Route element={<PrivateRoute position={201} path="/login/employee" />}>
        <Route path="/course/setting" element={<CourseSetting />} />
        <Route path="/food" element={<Food />} />
        <Route path="/health" element={<Health />} />
        <Route path="/stable" element={<Stable />} />
        <Route path="/stable/list" element={<StableList />} />
        <Route path="/stable" element={<StablePage />} />
        <Route path="/horse" element={<Horse />} />
      </Route>
    </Routes>
  );
}

export default App;
