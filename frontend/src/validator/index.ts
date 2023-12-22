import { z } from "zod";

export const tourFormSchema = z.object({
  Date: z
    .date({ required_error: "Date is required" })
    .min(new Date(), "Date must be in the future"),
  Participants: z.number().min(8, "There must be at least 8 participants."),
  Email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  Name: z.string().optional(),
  TourTypeID: z.number({ required_error: "Please select a tour type" }),
  PlanID: z.number({ required_error: "Please select a plan" }),
});

export type TourFormData = z.infer<typeof tourFormSchema>;
