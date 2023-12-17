export const Menus: { [key: string]: { label: string; to: string }[] } = {
  emp: [
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
