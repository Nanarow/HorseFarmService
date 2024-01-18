import { Schedule } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>();
  useEffect(() => {
    async function fetchSchedules() {
      const res = await http.Get<Schedule[]>("/schedules");
      if (res.ok) {
        setSchedules(res.data);
      }
    }

    fetchSchedules();
  }, []);

  return { schedules };
};

export default useSchedule;
