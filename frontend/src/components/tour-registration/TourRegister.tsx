import tourImage from "@src/assets/tourbg-2.jpg";
import Form from "@shadcn/simplify/form";
import { useState } from "react";
import { http } from "@src/services/httpRequest";
import { Checkbox, Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";
import { ArrowRightSquareIcon } from "lucide-react";
import { ToItemList } from "@src/utils";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { Skeleton } from "@shadcn/ui/skeleton";
import { TourFormData, tourFormSchema } from "@src/validator";
import { useTourPlan, useTourType } from "@src/hooks";

const TourRegister = ({ onClick }: { onClick: () => void }) => {
  const { toast } = useToast();
  const { getUser } = useAuth();
  const { tourTypes } = useTourType();
  const { plans } = useTourPlan();
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);

  async function onValid(formData: TourFormData) {
    const tour = {
      ...formData,
      UserID: getUser().ID,
    };
    const res = await http.Post<string>("/tours", tour);
    if (res.ok) {
      toast({
        title: res.data,
        variant: "success",
        duration: 1500,
      });
      onClick();
    } else {
      toast({
        title: res.error,
        duration: 1500,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="grid lg:grid-cols-2 w-full h-full">
      <section className="h-full w-full flex justify-center items-center relative lg:order-2">
        <Tooltip content={"My tours registration"} side="left">
          <ArrowRightSquareIcon
            className="absolute top-2 right-4 text-green-500 hover:scale-105"
            onClick={onClick}
          />
        </Tooltip>

        <div className=" w-full h-full max-w-md flex justify-center flex-col py-12 px-4 lg:px-0">
          <Label className=" text-3xl font-bold text-center">
            Tour Registration
          </Label>
          <Form
            className="flex flex-col gap-2 mt-4"
            validator={tourFormSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form, errors }) => (
              <>
                <Form.Label>Tour Date</Form.Label>
                <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                <Form.Error field={errors.Date} />
                <Form.Label>Type of tour</Form.Label>
                {tourTypes.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(tourTypes)}
                    name="TourTypeID"
                    placeholder="Pick type of tour"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}
                <Form.Error field={errors.TourTypeID} />
                <Form.Label>Plan</Form.Label>
                {plans.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(plans, (p) => (
                      <>
                        {p.Name}
                        <span className="ml-4 text-sm text-muted-foreground">
                          {p.Description}
                        </span>
                      </>
                    ))}
                    name="PlanID"
                    placeholder="Pick your plan"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}
                <Form.Error field={errors.PlanID} />
                <Form.Label>Email</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  value={email}
                  disabled={check}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Error field={errors.Email} />

                <div className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(s) => {
                      s && setEmail(getUser().Email);
                      setCheck(s ? true : false);
                    }}
                  ></Checkbox>
                  <p className="text-sm text-muted-foreground">
                    use account email
                  </p>
                </div>

                <Form.Label>Participants</Form.Label>
                <Form.Input useForm={form} name="Participants" type="number" />
                <Form.Error field={errors.Participants} />
                <Label>Tour Name</Label>
                <Form.Input useForm={form} name="Name" type="text" />
                <Form.Error field={errors.Name} />
                <Form.SubmitButton useForm={form}>Register</Form.SubmitButton>
                {/* <Button variant={"outline"} onClick={refresh}>
                  Clear
                </Button> */}
              </>
            )}
          ></Form>
        </div>
      </section>
      <section className="w-full h-full p-2 relative order-[-1] lg:order-1">
        <img
          src={tourImage}
          className="w-full h-full object-cover rounded "
          alt="Tour"
        />
      </section>
    </div>
  );
};

export default TourRegister;
