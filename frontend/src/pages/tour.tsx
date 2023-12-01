import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import tourImage from "../assets/tourbg-3.jpg";
import Form, { ItemList } from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { TourType } from "../interfaces";
import { http } from "../services/httpRequest";

const Tour = () => {
  const formSchema = z.object({
    Name: z.string(),
    TourDate: z.date(),
    Participants: z.number(),
    TourTypeID: z.number(),
  });
  const [tourType, setTourType] = useState<TourType[] | undefined>(undefined);
  async function fetchTour() {
    const res = await http.Get<TourType[]>("/tour/types");
    if (res.ok) {
      setTourType(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchTour();
    };
  }, []);

  function tourTypeToSelectItems(tourType: TourType[]) {
    return tourType.map((tour) => {
      const newItem: ItemList = {
        value: tour.ID,
        label: tour.Name,
      };
      return newItem;
    });
  }

  return (
    <div className=" bg-secondary w-full h-screen flex relative">
      <img src={tourImage} className=" w-full object-cover "></img>
      <div className="absolute top-0 left-0 w-full h-full "></div>
      <Card className=" absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] rounded-sm">
        <CardHeader>
          <CardTitle className=" text-center ">Tour Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col gap-4"
            validator={formSchema}
            onValid={(data) => console.log(data)}
            onInvalid={(data) => console.log(data)}
            fields={({ form }) => (
              <>
                {tourType && (
                  <Form.Select
                    valueAsNumber
                    useForm={form}
                    items={tourTypeToSelectItems(tourType)}
                    name="TourTypeID"
                  ></Form.Select>
                )}
                <Form.DatePicker
                  useForm={form}
                  name="TourDate"
                ></Form.DatePicker>
                <Form.Input
                  useForm={form}
                  name="Name"
                  type="text"
                  placeholder="Name"
                ></Form.Input>
                <Form.Input
                  useForm={form}
                  name="Participants"
                  type="number"
                  placeholder="Participants"
                ></Form.Input>
                <Form.SubmitButton useForm={form}>
                  Registration
                </Form.SubmitButton>
              </>
            )}
          ></Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tour;
