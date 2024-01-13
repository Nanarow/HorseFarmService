import { z } from "zod";

export const tourFormSchema = z.object({
  Date: z
    .date({ required_error: "Date is required" })
    .min(new Date(), "Date must be in the future"),
  Participants: z
    .number({ required_error: "Participants is required" })
    .min(8, "There must be at least 8 participants."),
  Email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  Name: z.string().optional(),
  TourTypeID: z.number({ required_error: "Please select a tour type" }),
  PlanID: z.number({ required_error: "Please select a plan" }),
});

export type TourFormData = z.infer<typeof tourFormSchema>;

export const courseFormSchema = z.object({
  Name: z.string(),
  Duration: z.number({ required_error: "Duration is required" }),
  Participants: z.number().max(12, "Participants not more than 12"),
  Description: z.string().optional(),
  Experience: z.number({ required_error: "Experience is required" }),
  LocationID: z.number({ required_error: "Please select a location" }),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;

export const employeeFormSchema = z.object({
  FirstName: z.string().min(2, "FirstName must be at least 2 characters"),
  LastName: z.string().min(2, "Tooth must be at least 2 characters"),
  Email: z.string().email("Please enter a valid email"),
  Phone: z.string().max(10, "Phone must be at least 10 characters"),
  Password: z
    .string()
    .min(2, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  DayOfBirth: z.date().max(new Date(), "Date must be in the past"),
  PositionID: z.number({ required_error: "Please select a position" }),
  PrecedeID: z.number({ required_error: "Please select a precede" }),
  GenderID: z.number({ required_error: "Please select a gender" }),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;

export const employeeupdateFormSchema = z.object({
  FirstName: z.string().min(2, "FirstName must be at least 2 characters"),
  LastName: z.string().min(2, "Tooth must be at least 2 characters"),
  Email: z.string().email("Please enter a valid email"),
  Phone: z.string().max(10, "Phone must be at least 10 characters"),
  DayOfBirth: z.date().max(new Date(), "Date must be in the past"),
  PositionID: z.number({ required_error: "Please select a position" }),
  PrecedeID: z.number({ required_error: "Please select a precede" }),
  GenderID: z.number({ required_error: "Please select a gender" }),
});

export type EmployeeupdateFormData = z.infer<typeof employeeupdateFormSchema>;

export const healthFormSchema = z.object({
  Vital: z.string().min(4, "Vital must be at least 4 characters"),
  Tooth: z.string().min(4, "Tooth must be at least 4 characters"),
  Vaccine: z.string().min(4, "Vaccine must be at least 4 characters"),
  Parasite: z.string().min(4, "Parasite must be at least 4 characters"),
  Blood: z.string().min(4, "Blood must be at least 4 characters"),
  Date: z.date().min(new Date(), "Date must be in the future"),
  HorseID: z.number({ required_error: "Please select a horse" }),
  EmployeeID: z.number({ required_error: "Please select a employee" }),
});

export type HealthFormData = z.infer<typeof healthFormSchema>;

export const userFormSchema = z.object({
  FirstName: z.string().min(1, "FirstName is required"),
  LastName: z.string().min(1, "LastName is required"),
  Age: z.number({ required_error: "Age is required" }),
  ExperiencePoint: z.number().nonnegative(),
  Email: z.string().email({ message: "Invalid email address" }),
  Password: z.string().min(8, "Password must be at least 8 characters"),
  Phone: z.string().length(10, "Phone number must be 10 characters"),
  Profile: z.string(),
  GenderID: z.number(),
  RidingLevelID: z.number(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const userUpdateFormSchema = z.object({
  FirstName: z.string().min(1, "FirstName is required"),
  LastName: z.string().min(1, "LastName is required"),
  Age: z.number({ required_error: "Age is required" }),
  ExperiencePoint: z.number().nonnegative(),
  Email: z.string().email({ message: "Invalid email address" }),
  Phone: z.string().length(10, "Phone number must be 10 characters"),
  Profile: z.string(),
  GenderID: z.number(),
  RidingLevelID: z.number(),
});

export type UserUpdateFormData = z.infer<typeof userUpdateFormSchema>;

export const horseFormSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Age: z.number({ required_error: "Age is required" }),
  Date: z.date().min(new Date(), "Date must be in the future"),
  Image: z.string(),
  EmployeeID: z.number(),
  BleedID: z.number(),
  SexID: z.number(),
  StableID: z.number(),
});

export type HorseFormData = z.infer<typeof horseFormSchema>;

export const horseUpdateFormSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Age: z.number({ required_error: "Age is required" }),
  Date: z.date(),
  Image: z.string(),
  EmployeeID: z.number(),
  BleedID: z.number(),
  SexID: z.number(),
  StableID: z.number(),
});

export type HorseUpdateFormData = z.infer<typeof horseUpdateFormSchema>;

export const foodFormSchema = z.object({
  Fat: z.string({ required_error: "Fat is required"}),
	Carbohydrate: z.string({ required_error: "Carbohydrate is required"}),
	Protein: z.string({ required_error: "Protein is required"}),
	Vitamin: z.string({ required_error: "Vitamin is required"}),
	Mineral: z.string({ required_error: "Mineral is required"}),
	Forage: z.string({ required_error: "Forage is required"}),
	Date: z.date().min(new Date(), "Date must be current"),
});

export type FoodFormData = z.infer<typeof foodFormSchema>;

export const stableFormSchema = z.object({
  Maintenance: z.date().min(new Date(), "Date must be in the future"),
  Cleaning: z.date().min(new Date(), "Date must be in the future"),
  Temperature: z.number(),
  Humidity: z.number(),
  Description: z.string().min(4, "Description must be at least 4 characters"),

});

export type StaableFormData = z.infer<typeof stableFormSchema>;

export const stableUpdateFormSchema = z.object({
  Maintenance: z.date(),
  Cleaning: z.date(),
  Temperature: z.number(),
  Humidity: z.number(),
  Description: z.string().min(4, "Description must be at least 4 characters"),

});

export type StaableUpdateFormData = z.infer<typeof stableUpdateFormSchema>;