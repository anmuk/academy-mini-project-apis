import { z } from "zod";


export const CreateExpenseSchema = z.object({
	date: z.string().min(1, "Date cannot be empty"),
	description: z.string().min(1, "Description cannot be empty"),
	user: z.string().min(1, "User cannot be empty"),
});

export const IdParamSchema = z.object({
	id: z.coerce.number().positive({ message: "id must be a positive integer" })
});

export interface ExpenseResponseDto {
    id: number;
	date: string;
	description: string;
	user: string;
}


// Derive the TypeScript type — no duplication
export type CreateExpenseRequestDto = z.infer<typeof CreateExpenseSchema>;
// ^ { date: string; description: string; user: string }

