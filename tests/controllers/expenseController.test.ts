import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { ExpenseController } from "../../src/controllers/expenseController";

const mockService = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("ExpenseController - getAll", () => {
    it("should return 200 with all expenses", async () => {
        const expenses = [{ id: 1, date: "20-01-2026", description: "Watch", user: "Aniket1" }, 
                            { id: 2, date: "21-02-2026", description: "Phone", user: "Aniket2" },
                            { id: 3, date: "23-03-2026", description: "Laptop", user: "Aniket3" }
        ];

        mockService.findAll.mockResolvedValue(expenses);

        const mockReq = {} as Request;
        const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any as Response;

        const controller = new ExpenseController(mockService as any);
        await controller.getAll(mockReq, mockRes);

        expect(mockService.findAll).toHaveBeenCalledOnce();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expenses);
    });

    it("should return 500 if service throws an error", async () => {

        mockService.findAll.mockRejectedValue(new Error("DB error"));
        const mockReq = {} as Request;
        const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any as Response;

        const controller = new ExpenseController(mockService as any);
        await controller.getAll(mockReq, mockRes);

        expect(mockService.findAll).toHaveBeenCalledOnce();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });

    
});

describe("ExpenseController - getById", () => {
    it("should return 200 with one expense when id exists", async () => {
        const expense = { id: 1, date: "20-01-2026", description: "Watch", user: "Aniket1" };
        mockService.findById.mockResolvedValue(expense);

        const mockReq = { params: { id: "1" } } as any as Request;
        const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any as Response;

        const controller = new ExpenseController(mockService as any);
        await controller.getById(mockReq, mockRes);

        expect(mockService.findById).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expense);
    });

    it("should return 404 when expense is not found", async () => {
        mockService.findById.mockResolvedValue(undefined);

        const mockReq = { params: { id: "999" } } as any as Request;
        const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any as Response;

        const controller = new ExpenseController(mockService as any);
        await controller.getById(mockReq, mockRes);

        expect(mockService.findById).toHaveBeenCalledWith(999);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Expense not found" });
    });

    it("should return 400 when id is not a number", async () => {
        const mockReq = { params: { id: "abc" } } as any as Request;
        const mockRes = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any as Response;

        const controller = new ExpenseController(mockService as any);
        await controller.getById(mockReq, mockRes);

        expect(mockService.findById).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "ID must be a number" });
    });

});

