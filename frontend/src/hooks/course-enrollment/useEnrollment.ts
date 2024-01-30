import { Enrollment } from "@src/interfaces";
import { useAuth } from "@src/providers/authProvider";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";
interface ScheduleWithEnroll {
  ScheduleID: number;
  EnrollmentCount: number;
}
const useEnrollment = () => {
  const { getUser } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [schedulesWithEnrolls, setSch] = useState<ScheduleWithEnroll[]>([]);
  function getEnrollmentCountByScheduleID(id: number) {
    return (
      schedulesWithEnrolls.find((s) => s.ScheduleID === id)?.EnrollmentCount ||
      0
    );
  }
  async function fetchSchedulesWithEnrolls() {
    const res = await http.Get<ScheduleWithEnroll[]>("/schedules/enrollments");
    if (res.ok) {
      setSch(res.data);
    }
  }
  async function fetchUserEnrollments() {
    const res = await http.Get<Enrollment[]>(
      "/enrollments/user/" + getUser().ID
    );
    if (res.ok) {
      setEnrollments(res.data);
      fetchSchedulesWithEnrolls();
    }
  }
  useEffect(() => {
    fetchUserEnrollments();
  }, []);

  return { enrollments, fetchUserEnrollments, getEnrollmentCountByScheduleID };
};

export default useEnrollment;
