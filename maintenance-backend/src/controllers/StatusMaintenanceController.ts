import { StatusMaintenanceService } from '../services/StatusMaintenanceService';
import { StatusMaintenanceSchema } from '../validation/StatusMaintenanceValidation';
import { ValidationError } from '../errors/ValidationError';

const service = new StatusMaintenanceService();

export class StatusMaintenanceController {
  async getAll() {
    try {
      const statusMaintenances = await service.getAll();
      return statusMaintenances;
    } catch (error) {
      throw new Error('Failed to fetch status maintenances');
    }
  }

  async getById(id: number) {
    try {
      const statusMaintenance = await service.getById(id);
      if (!statusMaintenance) {
        return null;  // Return null if not found
      }
      return statusMaintenance;
    } catch (error) {
      throw new Error('Failed to fetch status maintenance');
    }
  }

  async create(name: string, color: string, created_by: string) {
    try {
      // Validate the input data
      const { error } = StatusMaintenanceSchema.validate({ name, color, created_by });
      if (error) {
        const validationErrors = error.details.map(detail => ({
          message: detail.message,
          path: detail.path.join('.'),
          type: detail.type,
        }));
        throw new ValidationError(JSON.stringify(validationErrors));
      }
      return await service.create(name, color, created_by);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: number, name?: string, color?: string, updated_by?: string) {
    try {
      return await service.update(id, name, color, updated_by);
    } catch (error) {
      throw new Error('Failed to update status maintenance');
    }
  }

  async delete(id: number) {
    try {
      return await service.delete(id);
    } catch (error) {
      throw new Error('Failed to delete status maintenance');
    }
  }
}