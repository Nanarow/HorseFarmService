export interface TourRegistration {
  ID: number;
  TourType: TourType;
  Plan: Plan;
  Email: string;
  Participants: number;
  Name: string;
  Date: Date;
}

export interface Plan {
  ID: number;
  Name: string;
  Description?: string;
}

export interface TourType {
  ID: number;
  Name: string;
  Description?: string;
}

export interface Enrollment {
  ID: number;
  UserID: number;
  Schedule: Schedule;
}
export interface Horse {
  ID: number;
  Name: string;
  Age: number;
  Date: Date;
  Image: string;
  Employee: Employee;
  Bleed: Bleed;
  Sex: Sex;
  Stable: Stable;
}

export interface Stable {
  ID: number;
  Maintenance: Date;
  Cleaning: Date;
  Temperature: number;
  Humidity: number;
  Description: string;
  Employee: Employee;
  EmployeeID:number;
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
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  DateOfBirth: Date;
  Profile: string;
  RoleID: number;
  GenderID: number;
  Gender: Gender;
  ExperiencePoint: number;
  RidingLevelID: number;
  RidingLevel: RidingLevel;
}

export interface Support {
  ID: number;
  UserID: number;
  User: User;
  Corporate: string;
  Description: string;
  Date: Date;
  Bill: string;
}

export interface Role {
  ID: number;
  Name: string;
}

export interface RidingLevel {
  ID: number;
  Name: string;
  Description: string;
}

export interface Gender {
  ID: number;
  Name: string;
}

export interface Employee {
  ID: number;
  PositionID: number;
  Position: Position;
  GenderID: number;
  Gender: Gender;
  PrecedeID: number;
  Precede: Precede;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  DayOfBirth: Date;
  Phone: string;
}
export interface Health {
  ID: number;
  EmployeeID: number;
  Employee: Employee;
  HorseID: number;
  Horse: Horse;
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
  Experience: number;
  EmployeeID: number;
  LocationID: number;
}

export interface Schedule {
  ID: number;
  CourseID: number;
  Course: Course;
  Date: Date;
  StartTime: Date;
  Description?: string;
}

export interface Location {
  ID: number;
  Name: string;
  Description?: string;
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
