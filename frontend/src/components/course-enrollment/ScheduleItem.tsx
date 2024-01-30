import { Schedule } from "@src/interfaces";
import EnrollmentAlert from "./EnrollmentAlert";
import useEnrollment from "@src/hooks/course-enrollment/useEnrollment";
import ScheduleDetails from "./ScheduleDetails";

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
        <ScheduleDetails schedule={schedule} />
      ) : (
        <EnrollmentAlert
          ScheduleID={schedule.ID}
          onEnrolled={fetchUserEnrollments}
        />
      )}
    </div>
  );
};

export default ScheduleItem;
