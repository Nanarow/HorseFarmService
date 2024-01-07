import { Button } from "@shadcn/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/ui/popover";
import { Schedule } from "@src/interfaces";

const ScheduleDetails = ({ schedule }: { schedule: Schedule }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" bg-green-500 hover:bg-green-500/80">
          Enrolled
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {schedule.Course.Name}
        <br />
        {new Date(schedule.StartTime).toLocaleString()}
      </PopoverContent>
    </Popover>
  );
};

export default ScheduleDetails;
