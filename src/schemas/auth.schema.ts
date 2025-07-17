import { z } from "zod";

import { Constants } from "../utils/constants";

export const registrationSchema = z.object({
  email: z.email().nonempty(),
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  provider: z.string().nonempty(),
  sex: z.enum([Constants.FEMALE, Constants.MALE, Constants.OTHER]),
});
