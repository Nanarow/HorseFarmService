import { TourType } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { useEffect, useState } from "react";

const useTourType = () => {
  const [tourTypes, setTourType] = useState<TourType[]>([]);

  useEffect(() => {
    // declare async function inside useEffect
    async function fetchTour() {
      const res = await http.Get<TourType[]>("/tours/types");
      if (res.ok) {
        setTourType(res.data);
      }
    }
    // call async function
    fetchTour();
  }, []);
  return { tourTypes };
};

export default useTourType;
