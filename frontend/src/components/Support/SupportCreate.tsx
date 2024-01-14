import { http } from "../../services/httpRequest";
import Form from "@shadcn/simplify/form";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { useToast } from "@shadcn/ui/use-toast";
import { useAuth } from "@src/providers/authProvider";
import { SupportFormData, supportFormSchema } from "@src/validator";
import qrCode from "../../assets/QRCode.jpg";

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
    <div className="flex justify-center items-center w-full h-screen">
      <img
        src={qrCode}
        className="w-[250px] object-cover rounded mr-20"
        alt="QRcode"
      />
      <Card className=" w-[350px]">
        <CardHeader>
          <CardTitle>User Account management</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col gap-4"
            validator={supportFormSchema}
            onValid={onValid}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form }) => (
              <>
                <Form.Input
                  useForm={form}
                  name="Corporate"
                  type="text"
                  placeholder="Corporate"
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
                <Form.SubmitButton useForm={form}>
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
