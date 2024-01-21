import { http } from "../../services/httpRequest";
import Form from "@shadcn/simplify/form";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { useToast } from "@shadcn/ui/use-toast";
import { useAuth } from "@src/providers/authProvider";
import { SupportFormData, supportFormSchema } from "@src/validator";
import qrCode from "../../assets/QRCode.jpg";
import bg17 from "../../assets/bg17.jpg";

const SupportCreate = () => {
  const { toast } = useToast();
  const { getUser } = useAuth();
  async function onValid(formData: SupportFormData) {
    const support = {
      ...formData,
      UserID: getUser().ID,
    };
    const res = await http.Post<string>("/supports", support);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
      });
    } else {
      toast({
        title: res.error,
        duration: 1500,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center w-full h-with-nav">
      <img
        src={bg17}
        className="w-full h-full abs-center object-cover rounded"
        alt="background"
      />
      <img
        src={qrCode}
        className="w-[260px] flex relative object-cover rounded lg:mr-10"
        alt="QRcode"
      />
      <Card className=" w-[350px] relative mt-5 ">
        <CardHeader>
          <CardTitle>Support Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            className="w-full flex flex-col gap-4 lg:"
            validator={supportFormSchema}
            onValid={onValid}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form }) => (
              <>
                <Form.Input
                  useForm={form}
                  name="Corporate"
                  type="text"
                  placeholder="Name"
                />
                <Form.Input
                  useForm={form}
                  name="Description"
                  type="text"
                  placeholder="Description"
                />
                <Form.Input
                  useForm={form}
                  name="Image"
                  type="file"
                  accept="image/*"
                  placeholder="Name"
                />
                <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                <Form.SubmitButton 
                useForm={form}
                className="justify-self-center w-full max-w-lg lg:col-start-2"
                >
                  Give support
                </Form.SubmitButton>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportCreate;
