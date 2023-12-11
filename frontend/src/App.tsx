import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Account,
  Course,
  CourseSetting,
  Employee,
  Food,
  Health,
  Home,
  Horse,
  Login,
  Stable,
  Tour,
  User,
} from "./pages";
import PrivateRoute from "./components/privateRoute";
import ValidateForm from "./examples/form-with-validation";
import NoPage from "./pages/noPage";
import DragDropTable from "./examples/drag-drop-table";
import EmployeeList from "./components/Employee/EmployeeList";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NoPage />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login/admin" element={<Login role="admin" />}></Route>
      <Route path="/login/employee" element={<Login role="employee" />}></Route>
      <Route path="/login" element={<Login role="user" />}></Route>
      <Route path="/example/form" element={<ValidateForm />} />
      <Route path="/example/table" element={<DragDropTable />} />

      <Route element={<PrivateRoute role={101} />}>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/tour" element={<Tour />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Route>

      <Route element={<PrivateRoute role={100} path="/login/admin" />}>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/employee/list" element={<EmployeeList/>}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>

      <Route element={<PrivateRoute position={201} path="/login/employee" />}>
        <Route path="/course/setting" element={<CourseSetting />}></Route>
        <Route path="/food" element={<Food />}></Route>
        <Route path="/health" element={<Health />}></Route>
        <Route path="/stable" element={<Stable />}></Route>
        <Route path="/horse" element={<Horse />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
