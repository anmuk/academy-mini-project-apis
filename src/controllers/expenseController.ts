import { Request, Response } from "express";
import { ExpenseService} from "../services/expenseService";
import { ExpenseResponseDto, CreateExpenseRequestDto } from "../dtos/expenseDto";


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

    const dto: ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, user: expense.user};


    res.status(200).json(dto);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const expenses = await this.service.findAll();
        const dtos: ExpenseResponseDto[] = expenses.map(e => ({
            id: e.id,
            date: e.date,
            description: e.description,
            user: e.user,
        }));
        res.status(200).json(dtos);
    }

    async create(req: Request, res: Response): Promise<void> {
        const body: CreateExpenseRequestDto = req.body;
        const { date, description, user } = body;
        if (!date || !description || !user) {
            res.status(400).json({ error: "date, description and user are required" });
            return;
        }
        const expense = await this.service.create({ date, description, user });
        const dto: ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, user: expense.user };
        res.status(201).json(dto);
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
        const dto: ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, user: expense.user };
        res.status(200).json(dto);
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
