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
  Support,
  Tour,
  User,
} from "./pages";
import PrivateRoute from "./components/privateRoute";
import ValidateForm from "./examples/form-with-validation";
import DragDropTable from "./examples/drag-drop-table";
import UserList from "./components/user/UserList";
import StableList from "./components/stable/StableList";
import SupportList from "./components/support/SupportList";

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
        <Route path="/support/list" element={<SupportList />} />
      </Route>

      <Route element={<PrivateRoute role={100} path="/login/admin" />}>
        <Route path="/employee" element={<Employee />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/list" element={<UserList />} />
      </Route>

      <Route element={<PrivateRoute position={201} path="/login/employee" />}>
        <Route path="/course/setting" element={<CourseSetting />} />
        <Route path="/food" element={<Food />} />
        <Route path="/health" element={<Health />} />
        <Route path="/stable" element={<Stable />} />
        <Route path="/stable/list" element={<StableList />} />
        <Route path="/stable" element={<Stable />} />
        <Route path="/horse" element={<Horse />} />
      </Route>
    </Routes>
  );
}

export default App;
