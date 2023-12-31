import { Plan } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useTourPlan = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchPlan() {
      const res = await http.Get<Plan[]>("/tours/plans");
      if (res.ok) {
        setPlans(res.data);
      }
    }

    fetchPlan();
  }, []);
  return { plans };
};

export default useTourPlan;
