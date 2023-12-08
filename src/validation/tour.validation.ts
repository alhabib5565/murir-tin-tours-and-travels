// Define a schema using Zod for validation
import { z } from "zod";
const tourSchemaValidation = z.object({
    name: z.string().refine((value) => value.length < 5, {
        message: "String can't be more than 5 characters ",
    }),
    durationHours: z.number().int().positive(),
    ratingAverage: z.number().int().positive().min(1).max(5),
    ratingQuantity: z.number().default(0),
    price: z.number().positive('Please provide a valid price').nonnegative(),
    imageCover: z.string().nonempty('Please provide an image cover'),
    images: z.array(z.string()),
    createdAt: z.string(),
    startDates: z.array(z.string()),
    startLocation: z.string(),
    availableSeats: z.number(),
    locations: z.array(z.string()),
    slug: z.string().optional(),
});
export default tourSchemaValidation