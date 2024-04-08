import * as z from "zod";
import titles from "./titles.json";
import states from "./states.json";

const schema = z.object({
  title: z.enum(titles),
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, "First Name is required")
    .transform((str) => str.trim()),
  middleName: z.string().transform((str) => str.trim()),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, "Last Name is required")
    .transform((str) => str.trim()),
  dob: z.coerce
    .date()
    .refine(
      (dob) => {
        const today = new Date();
        const minimumDate = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDay()
        );
        if (dob > minimumDate) {
          return false;
        }
        return true;
      },
      { message: "You must be at least 16 to get an ID" }
    )
    .transform((date) => date.toLocaleDateString("en-AU")),
  state: z.enum(states.map((state) => state.code)),
});

export default schema;
