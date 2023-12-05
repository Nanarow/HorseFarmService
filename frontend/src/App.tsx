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

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NoPage />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login/admin" element={<Login role="admin" />}></Route>
      <Route path="/login/employee" element={<Login role="employee" />}></Route>
      <Route path="/login" element={<Login role="user" />}></Route>
      <Route path="/example/form" element={<ValidateForm />} />

      <Route element={<PrivateRoute role="user" />}>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/tour" element={<Tour />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Route>

      <Route element={<PrivateRoute role="admin" path="/login/admin" />}>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>

      <Route element={<PrivateRoute role="employee" path="/login/employee" />}>
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
