import { TourRegistration } from "@src/interfaces";
import { useAuth } from "@src/providers/authProvider";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useTours = () => {
  const { getUser } = useAuth();
  const [tours, setTours] = useState<TourRegistration[]>([]);
  async function fetchTours() {
    const res = await http.Get<TourRegistration[]>(
      "/tours/user/" + getUser().ID
    );
    if (res.ok) {
      setTours(res.data);
    }
  }
  useEffect(() => {
    fetchTours();
  }, []);
  return { tours, fetchTours };
};

export default useTours;
