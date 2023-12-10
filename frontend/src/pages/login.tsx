import { http } from "../services/httpRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import Form from "@shadcn/simplify/form";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@shadcn/ui/badge";
import { useEffect } from "react";
import { useAuth } from "@src/providers/authProvider";
import { Employee, User } from "@src/interfaces";
import { Label } from "@shadcn/ui";

interface LoginProps {
  role: "user" | "employee" | "admin";
}
const validLogin = z.object({
  Email: z.string().email("Please enter a valid email"),
  Password: z
    .string()
    .min(2, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
});
type TLogin = z.infer<typeof validLogin>;
const Login = ({ role }: LoginProps) => {
  const { setUser, setEmployee } = useAuth();
  // const [loginData, setLoginData] = useState<TLogin | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";

  async function onLogin(data?: TLogin) {
    console.log("login data: ", data);
    if (role === "user") {
      const res = await http.Post<User>("/login", data ? data : {});
      if (res.ok) {
        setUser(res.data);
        navigate(from, { replace: true });
      }
    } else if (role === "employee") {
      const res = await http.Post<Employee>(
        "/login/employee",
        data ? data : {}
      );
      if (res.ok) {
        setEmployee(res.data);
        navigate(from, { replace: true });
      }
    } else if (role === "admin") {
      const res = await http.Post<User>("/login/admin", data ? data : {});
      if (res.ok) {
        setUser(res.data);
        navigate(from, { replace: true });
      }
    }
  }

  useEffect(() => {
    return () => {
      onLogin();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-secondary flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl font-black text-primary mb-4 tracking-in-expand">
        Horse Farm
      </h1>
      <Card className="flex flex-col w-3/4 max-w-sm relative">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary text-center ">
            Log in
          </CardTitle>
        </CardHeader>
        <CardContent>
          {role !== "user" && (
            <Badge
              className={` absolute top-2 right-2 rounded-full ${
                role === "admin"
                  ? "bg-sky-500 hover:bg-sky-500/80"
                  : "bg-amber-500 hover:bg-amber-500/80"
              }`}
            >
              {role}
            </Badge>
          )}
          <Form
            className="flex flex-col gap-4"
            validator={validLogin}
            onValid={onLogin}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form }) => (
              <>
                <Label>Email</Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  placeholder="example@mail.com"
                />
                <Label>Password</Label>
                <Form.Input
                  useForm={form}
                  name="Password"
                  type="password"
                  placeholder="A-Z,0-9,@"
                />
                <Form.SubmitButton useForm={form}>Log in</Form.SubmitButton>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
