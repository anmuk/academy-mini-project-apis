import { Router } from "express";
import { ExpenseController } from "../controllers/expenseController";
import { validateBody, validateParams } from "../middleware/validate";
import { CreateExpenseSchema, IdParamSchema } from "../dtos/expenseDto";

const router = Router();
const controller = new ExpenseController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", validateParams(IdParamSchema), controller.getById.bind(controller));
router.post("/", validateBody(CreateExpenseSchema), controller.create.bind(controller));
router.put("/:id", validateParams(IdParamSchema), validateBody(CreateExpenseSchema), controller.update.bind(controller));
router.delete("/:id", validateParams(IdParamSchema), controller.delete.bind(controller));

export default router;
