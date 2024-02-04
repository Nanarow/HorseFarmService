import { PopoverContent } from "@shadcn/ui/popover";
import { Schedule } from "@src/interfaces";

const ScheduleDetails = ({ schedule }: { schedule: Schedule }) => {
  return (
    <PopoverContent className="grid grid-cols-3">
      <p className=" font-bold">{schedule.Course.Name}</p>
      <p className=" col-start-3 text-end">
        {"exp:  "}
        {schedule.Course.Experience}
      </p>
      <p className=" col-span-2 text-sm">
        {new Date(schedule.StartTime).toLocaleString()}
      </p>
      <p className=" text-sm text-end">{schedule.Course.Location.Name}</p>
    </PopoverContent>
  );
};

export default ScheduleDetails;
