import { z } from "zod";

export const registrationSchema = z.object({
  email: z.email(),
  name: z.string(),
});
