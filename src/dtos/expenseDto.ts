export interface ExpenseResponseDto {
    id: number;
	date: string;
	description: string;
	user: string;
}

export interface CreateExpenseRequestDto {
    date: string;
	description: string;
	user: string;
}

    

// Create `src/dtos/expenseDto.ts` with **two interfaces**:

// **`ExpenseResponseDto`** — what the client receives. Fields: `id`, `date`, `description`, `user`.

// **`CreateExpenseRequestDto`** — what the client sends when creating an expense. Fields: `date`, `description`, `user`.

// > Notice `id` is absent from the request DTO — clients never supply an `id`, the server generates it.

// **Why two separate types?** If you later add sensitive internal fields to `Expense`, they won't accidentally appear in responses. Each type has one clear job.