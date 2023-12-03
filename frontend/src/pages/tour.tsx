import tourImage from "../assets/tourbg-2.jpg";
import Form, { ItemList } from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { TourRegistration, TourType } from "../interfaces";
import { http } from "../services/httpRequest";
import { Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";

const Tour = () => {
  const { toast } = useToast();
  const formSchema = z.object({
    Name: z.string(),
    Date: z.date(),
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

  async function onValid(formData: z.infer<typeof formSchema>) {
    const tour: TourRegistration = {
      ...formData,
      UserID: 0,
      Participant: 0,
    };
    const res = await http.Post<TourRegistration, TourRegistration>(
      "/tours",
      tour
    );
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(tour, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }

  return (
    <div className="  w-full h-screen grid md:grid-cols-2">
      <section className="w-full h-full p-2">
        <img
          src={tourImage}
          className="w-full h-full object-cover rounded "
          loading="lazy"
          alt="Tour"
        />
      </section>
      <section className="h-full w-full flex justify-center items-center">
        <div className=" w-full h-full p-20 max-w-lg flex justify-center flex-col">
          <Label className=" text-4xl font-bold text-center">
            Tour Registration
          </Label>
          <Form
            className="flex flex-col gap-4 mt-12"
            validator={formSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form }) => (
              <>
                <Label>
                  Tour Date<span className="text-red-500">*</span>
                </Label>
                <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                {tourType && (
                  <>
                    <Label>
                      Type of tour<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={tourTypeToSelectItems(tourType)}
                      name="TourTypeID"
                      placeholder="Pick type of tour"
                    ></Form.Select>
                  </>
                )}

                <Label>
                  Tour Name<span className="text-red-500">*</span>
                </Label>
                <Form.Input useForm={form} name="Name" type="text"></Form.Input>
                <Label>
                  Participants<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Participants"
                  type="number"
                ></Form.Input>
                <Form.SubmitButton useForm={form}>
                  Registration
                </Form.SubmitButton>
                {/* <button onClick={() => console.log(form.formState.dirtyFields)}>
                  Cancel
                </button>
                <button onClick={() => form.reset()}>Reset</button> */}
              </>
            )}
          ></Form>
        </div>
      </section>
    </div>
  );
};

export default Tour;
