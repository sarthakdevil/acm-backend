Put your zod schemas here instead of inside the controller

append .schema.js in front of new files to follow the format (like the example file i made)

import validator middleware and zod schema in router and apply it

example:

import { validate } from "../middlewares/validate.middleware.js";
import { somethingSchema } from "../schemas/something.schema.js";

router.post("/something", validate(somethingSchema), doSomething);