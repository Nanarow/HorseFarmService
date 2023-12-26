type Role = "user" | "employee" | "admin";
interface Menu {
  label: string;
  to: string;
}
type TMenus = {
  [key in Role]: Menu[];
};
export const Menus: TMenus = {
  employee: [
    {
      label: "Horse",
      to: "/horse",
    },
    {
      label: "Health",
      to: "/health",
    },
    {
      label: "Stable",
      to: "/stable",
    },
    {
      label: "Course",
      to: "/course/setting",
    },
    {
      label: "Food",
      to: "/food",
    },
  ],
  user: [
    {
      label: "Course",
      to: "/course",
    },
    {
      label: "Tour Registration",
      to: "/tour",
    },
  ],
  admin: [
    {
      label: "User",
      to: "/user",
    },
    {
      label: "Employee",
      to: "/employee",
    },
  ],
};
