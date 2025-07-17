import { z } from "zod";

export const registrationSchema = z.object({
  email: z.email().nonempty(),
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  provider: z.string().nonempty(),
  sex: z.enum(["female", "male", "other"]),
});
