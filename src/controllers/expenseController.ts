import { Request, Response } from "express";
import { ExpenseService} from "../services/expenseService";


export class ExpenseController {

    constructor(private service: ExpenseService = new ExpenseService()) {}

    async getById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }

    const expense = await this.service.findById(id);

    if (!expense) {
        res.status(404).json({ error: "Expense not found" });
        return;
    }

    res.status(200).json(expense);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const expenses = await this.service.findAll();

        res.status(200).json(expenses);
    }

    async create(req: Request, res: Response): Promise<void> {
        const { date, description, user } = req.body;
        if (!date || !description || !user) {
            res.status(400).json({ error: "date, description and user are required" });
            return;
        }
        const expense = await this.service.create({ date, description, user });
        res.status(201).json(expense);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }
        const expense = await this.service.update(id, req.body);
        if (!expense) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }
        res.status(200).json(expense);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "ID must be a number" });
            return;
        }
        const deleted = await this.service.delete(id);
        if (!deleted) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }
        res.status(204).send();
    }


}




// Create a new file at `src/controllers/expenseController.ts`.

// The controller is responsible for **handling HTTP** — parsing parameters, calling the service, and returning the correct status codes. It should never touch the data store directly.

// ### Your controller should:

// - Accept an `ExpenseService` instance via the constructor (Dependency Injection)
// - Implement the following methods:

// | Method | Validates | Success response | Error response |
// |--------|-----------|-----------------|----------------|
// | `getAll(req, res)` | — | `200` with array | — |
// | `getById(req, res)` | `id` is a number | `200` with expense | `400` if NaN, `404` if not found |
// | `create(req, res)` | `date`, `description`, `user` present in body | `201` with new expense | `400` if fields missing |
// | `update(req, res)` | `id` is a number | `200` with updated expense | `400` if NaN, `404` if not found |
// | `delete(req, res)` | `id` is a number | `204` no body | `400` if NaN, `404` if not found |

// > **Rule of thumb:** if it references `req` or `res`, it belongs in the controller — not the service.
