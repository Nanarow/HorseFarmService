import courseimg from "../assets/coursesettingBG.jpg";
import { Label } from "@shadcn/ui";
import Form from "@shadcn/simplify/form";
import { Input } from "@shadcn/ui/input";


const CourseSetting = () => {
  return (
    <div className="grid md:grid-cols-2 w-full h-full">
        <section className="w-full h-full p-2 relative">
          <img
            src={courseimg}
            className="w-full h-full object-cover rounded "
          />
        </section>
        <section className="h-full w-full flex justify-center items-center relative">
            <div className=" w-full h-full p-20 max-w-lg flex justify-center flex-col">
                <Label className=" text-4xl font-bold text-center">
                    Course Setting
                </Label>
                <form
                  className="flex flex-col gap-4 mt-12">
                    <Label>
                      Course Name<span className="text-red-500">*</span>
                    </Label>
                    <Input></Input>
                    <Label>
                      Participants<span className="text-red-500">*</span>
                    </Label>
                    <Input></Input>
                    <Label>
                      Experience<span className="text-red-500">*</span>
                    </Label>
                    <Input></Input>
                    <Label>
                      Description<span className="text-red-500">*</span>
                    </Label>
                    <Input></Input>
                </form>
            </div>
        </section>
      </div>
  );
};

export default CourseSetting;
