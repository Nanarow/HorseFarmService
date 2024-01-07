import { Enrollment } from "@src/interfaces";
import { useAuth } from "@src/providers/authProvider";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useEnrollment = () => {
  const { getUser } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  async function fetchUserEnrollments() {
    const res = await http.Get<Enrollment[]>(
      "/enrollments/user/" + getUser().ID
    );
    if (res.ok) {
      setEnrollments(res.data);
    }
  }
  useEffect(() => {
    fetchUserEnrollments();
  }, []);

  return { enrollments, fetchUserEnrollments };
};

export default useEnrollment;
