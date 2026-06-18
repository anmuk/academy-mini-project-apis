const expenses = [
	{
	id: 1,
	date: "20-10-2026",
	description: "Expense 1",
	user: "Aniket",
},
	{
		id: 2,
		date: "21-10-2026",
		description: "Expense 2",
		user: "Another Aniket",
	},
];


export class ExpenseService {
    async findById(id: number): Promise<any> {
        return expenses.find(e => e.id === id);
    }


    async findAll(): Promise<any[]> {
        return expenses;
    }

    // generate a new `id` by finding the current maximum `id` in the array and adding 1.
    async create(expense: any): Promise<any> {
        const newId = expenses.length
            ? Math.max(...expenses.map(e => e.id)) + 1
            : 1;
        const newExpense = { ...expense, id: newId };
        expenses.push(newExpense);
        return newExpense;
    }

    async update(id: number, expense: any): Promise<any> {
        const index = expenses.findIndex(e => e.id === id);
        if (index === -1) {
            return undefined;
        }
    
        // Object.assign (mutates in place, no new object)
        Object.assign(expenses[index], expense);

        return expenses[index];
    }

    async delete(id: number): Promise<boolean> {
        const index = expenses.findIndex(e => e.id === id);
        if (index === -1) {
            return false;
        }
        expenses.splice(index, 1);
        return true;
    }

}



//  Method signature | Returns | Description |
// |-----------------|---------|-------------|
// | `findAll()` | `Promise<any[]>` | Return all expenses |
// | `findById(id: number)` | `Promise<any>` | Return one expense, or `undefined` |
// | `create(expense: any)` | `Promise<any>` | Add a new expense and return it with a generated `id` |
// | `update(id: number, expense: any)` | `Promise<any>` | Update an existing expense, return `undefined` if not found |
// | `delete(id: number)` | `Promise<boolean>` | Remove an expense, return `true` if removed or `false` if not found |

// > **Tip:** For `create`, generate a new `id` by finding the current maximum `id` in the array and adding 1.