import { ZodError } from "zod";
import { BadInputError } from "../errors/custom-errors.js";
import { formatZodErrorIssues } from "../utils/index.js";
export const zParser = async (schema, req) => {
    try {
        return await schema.parseAsync(req);
    }
    catch (error) {
        if (error instanceof ZodError) {
            const details = formatZodErrorIssues(error);
            const message = details
                .map((e) => `field ${e.property} = ${e.message}`)
                .join("\n");
            throw new BadInputError(message, details);
        }
        throw error;
    }
};
