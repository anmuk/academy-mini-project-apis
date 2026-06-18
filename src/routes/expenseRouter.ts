// import { Router } from "express";

// const router = Router();

// // Static expense data for now (no database or req.body yet)
// const expense = {
// 	id: 1,
// 	date: "20-10-2026",
// 	description: "Expense 1",
// 	user: "Aniket",
// };

// const expenses = [
// 	expense,
// 	{
// 		id: 2,
// 		date: "21-10-2026",
// 		description: "Expense 2",
// 		user: "Another Aniket",
// 	},
// ];

// // Get all expenses
// router.get("/", (req: Request, res: Response) => {
// 	res.json(expenses);
// });

// // Get a single expense
// router.get("/:id", (req: Request, res: Response) => {
// 	res.json(expense);
// });

// // Create a new expense
// router.post("/", (req: Request, res: Response) => {
// 	res.status(201).json(expense);
// });

// // Update an expense
// router.put("/:id", (req: Request, res: Response) => {
// 	res.status(200).json(expense);
// });

// // Delete an expense
// router.delete("/:id", (req: Request, res: Response) => {
// 	res.status(204).send();
// });

// export default router;





// Refactor `src/routes/expenseRouter.ts` so that each route **delegates** to the controller. No logic should remain in the route file.

import { Router } from "express";
import { ExpenseController } from "../controllers/expenseController";

const router = Router();
const controller = new ExpenseController();

router.get("/",     (req, res) => controller.getAll(req, res));
router.get("/:id",  (req, res) => controller.getById(req, res));
router.post("/",    (req, res) => controller.create(req, res));
router.put("/:id",  (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
