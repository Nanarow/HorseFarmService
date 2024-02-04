import { Schedule } from "@src/interfaces";
import EnrollmentAlert from "./EnrollmentAlert";
import useEnrollment from "@src/hooks/course-enrollment/useEnrollment";
import ScheduleDetails from "./ScheduleDetails";
import { Popover, PopoverTrigger } from "@shadcn/ui/popover";
import { Button } from "@shadcn/ui";

const ScheduleItem = ({ schedule }: { schedule: Schedule | undefined }) => {
  if (!schedule) {
    return;
  }

  const { enrollments, fetchUserEnrollments, getEnrollmentCountByScheduleID } =
    useEnrollment();

  const isEnrolled = () => {
    for (let i = 0; i < enrollments.length; i++) {
      if (enrollments[i].Schedule?.ID === schedule.ID) {
        return true;
      }
    }
    return false;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center">
            <p>{schedule.Course.Name}</p>
            <p>
              {getEnrollmentCountByScheduleID(schedule.ID)}
              {" / "}
              {schedule.Course.Participants}
            </p>
          </div>
          {isEnrolled() && enrollments ? (
            <Button className=" bg-green-500 hover:bg-green-500/80">
              Enrolled
            </Button>
          ) : (
            <EnrollmentAlert
              ScheduleID={schedule.ID}
              onEnrolled={fetchUserEnrollments}
            />
          )}
        </div>
      </PopoverTrigger>
      <ScheduleDetails schedule={schedule} />
    </Popover>
  );
};

export default ScheduleItem;
