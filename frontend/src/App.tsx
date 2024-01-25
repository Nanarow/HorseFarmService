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
import UserList from "./components/user/UserList";
import SupportList from "./components/support/SupportList";
import useWindowError from "./hooks/useWindowError";

function App() {
  useWindowError();
  return (
    <Routes>
      <Route path="/*" element={<NoPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />

      <Route path={"/login/admin"} element={<Login role="admin" />} />
      <Route path="/login/employee" element={<Login role="employee" />} />
      <Route path="/login" element={<Login role="user" />} />

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
        <Route path="/health" element={<Health />} />
      </Route>

      <Route element={<PrivateRoute position={202} path="/login/employee" />}>
        <Route path="/course/setting" element={<CourseSetting />} />
      </Route>
      <Route element={<PrivateRoute position={203} path="/login/employee" />}>
        <Route path="/horse" element={<Horse />} />
      </Route>
      <Route element={<PrivateRoute position={204} path="/login/employee" />}>
        <Route path="/food" element={<Food />} />
      </Route>
      <Route element={<PrivateRoute position={205} path="/login/employee" />}>
        <Route path="/stable" element={<Stable />} />
      </Route>
    </Routes>
  );
}

export default App;
