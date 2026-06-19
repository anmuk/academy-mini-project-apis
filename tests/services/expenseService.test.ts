import { describe, it, expect, beforeEach} from 'vitest';
import { ExpenseService } from '../../src/services/expenseService';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    service = new ExpenseService();
  });

  describe('findAll', () => {
    it('should return all expenses', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
    });
  });

  describe('findById', () => {
    it('should return the expense with the given id', async () => {
      const result = await service.findById(1);
      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
    });

    it('should return undefined for a non-existent id', async () => {
      const result = await service.findById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should return a new expense with a generated id', async () => {
      const result = await service.create({ date: '22-10-2026', description: 'New Expense', user: 'Test User' });
      expect(result.id).toBe(4);
      expect(result.date).toBe('22-10-2026');
      expect(result.description).toBe('New Expense');
      expect(result.user).toBe('Test User');
    });

    it('should persist the new expense', async () => {
      await service.create({ date: '22-10-2026', description: 'New Expense', user: 'Test User' });
      const all = await service.findAll();
      expect(all).toHaveLength(5);
    });
  });

  describe('update', () => {
    it('should update an existing expense and return it', async () => {
      const result = await service.update(1, { description: 'Updated Description' });
      expect(result).toBeDefined();
      expect(result?.description).toBe('Updated Description');
      expect(result?.id).toBe(1);
    });

    it('should return undefined for a non-existent id', async () => {
      const result = await service.update(999, { description: 'Updated' });
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete an existing expense and return true', async () => {
      const result = await service.delete(1);
      expect(result).toBe(true);
    });

    it('should return false for a non-existent id', async () => {
      const result = await service.delete(999);
      expect(result).toBe(false);
    });

    it('should remove the expense from the list', async () => {
      await service.delete(1);
      const all = await service.findAll();
      expect(all).toHaveLength(4);
    });
  });
});
