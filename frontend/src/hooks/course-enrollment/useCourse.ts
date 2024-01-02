import { Course } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useCourse = () => {
  const [courses, setCourse] = useState<Course[]>([]);
  useEffect(() => {
    async function fetchCourses() {
      const res = await http.Get<Course[]>("/courses");
      if (res.ok) {
        setCourse(res.data);
      }
    }

    fetchCourses();
  }, []);

  return { courses };
};
export default useCourse;
