import { Router, Request, Response } from "express";

const router = Router();

// Static expense data for now (no database or req.body yet)
const expense = {
	id: 1,
	date: "20-10-2026",
	description: "Expense 1",
	user: "Aniket",
};

const expenses = [
	expense,
	{
		id: 2,
		date: "21-10-2026",
		description: "Expense 2",
		user: "Another Aniket",
	},
];

// Get all expenses
router.get("/", (req: Request, res: Response) => {
	res.json(expenses);
});

// Get a single expense
router.get("/:id", (req: Request, res: Response) => {
	res.json(expense);
});

// Create a new expense
router.post("/", (req: Request, res: Response) => {
	res.status(201).json(expense);
});

// Update an expense
router.put("/:id", (req: Request, res: Response) => {
	res.status(200).json(expense);
});

// Delete an expense
router.delete("/:id", (req: Request, res: Response) => {
	res.status(204).send();
});

export default router;
