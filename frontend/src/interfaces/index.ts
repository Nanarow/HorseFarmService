export interface TourRegistration {
  ID?: number;
  UserID: number;
  TourTypeID: number;
  TourType?: TourType;
  PlanID: number;
  Plan?: Plan;
  Email: string;
  Participants: number;
  Name: string;
  Date: Date;
}

export interface Plan {
  ID: number;
  Name: string;
  Description: string;
}

export interface TourType {
  ID: number;
  Name: string;
  MinParticipant: number;
  MaxParticipant: number;
  Description: string;
}

export interface Enrollment {
  ID: number;
  UserID: number;
  CourseID: number;
  Date: Date;
  Remark: string;
}
export interface Horse {
  ID: number;
  Name: string;
  Age: number;
  Date: Date;
  Image: string;
  EmployeeID: number;
  BleedID: number;
  SexID: number;
  StableID: number;
}

export interface Stable {
  ID: number;
  Maintenance: Date;
  Cleaning: Date;
  Temperature: number;
  Humidity: number;
  Description: string;
}

export interface Bleed {
  ID: number;
  Name: string;
  Description: string;
}

export interface Sex {
  ID: number;
  Name: string;
}

export interface User {
  ID?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Phone: string;
  Profile: string;
  RoleID: number;
  GenderID: number;
  // Gender: Gender;
  ExperiencePoint: number;
  RidingLevelID: number;
  TourRegistrations?: TourRegistration[];
}

export interface Support {
  ID: number;
  UserID: number;
  Corporate: string;
  Description: string;
  Date: Date;
  Image: string;
}

export interface Role {
  ID: number;
  Name: string;
}

export interface RidingLevel {
  Name: string;
  Description: string;
}

export interface Gender {
  ID: number;
  Name: string;
}

export interface Employee {
  ID?: number;
  PositionID: number;
  GenderID: number;
  PrecedeID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  DayOfBirth: Date;
  Phone: string;
}
export interface Health {
  ID?: number;
  EmployeeID: number;
  HorseID: number;
  Vital: string;
  Tooth: string;
  Vaccine: string;
  Parasite: string;
  Blood: string;
  Date: Date;
}

export interface Position {
  ID: number;
  Name: string;
  Salary: number;
  Description: string;
}

export interface Precede {
  ID: number;
  Name: string;
}

export interface Course {
  ID: number;
  Name: string;
  Duration: number;
  Participants: number;
  Description: string;
  EmployeeID: number;
  ScheduleID: number;
}

export interface Schedule {
  ID?: number;
  CourseID: number;
  Date: Date;
  StartTime: Date;
  Description: string;
  LocationID: number;
}

export interface Location {
  ID: number;
  Name: string;
  Description: string;
}

export interface Food {
  ID: number;
  Fat: string;
  Carbohydrate: string;
  Protein: string;
  Vitamin: string;
  Mineral: string;
  Forage: string;
  Date: Date;
  EmployeeID: number;
}
