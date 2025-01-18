import { UrgencyMaintenanceService } from '../services/UrgencyMaintenanceService';
import { UrgencyMaintenanceSchema } from '../validation/UrgencyMaintenanceValidation';
import { ValidationError } from '../errors/ValidationError';

const service = new UrgencyMaintenanceService();

export class UrgencyMaintenanceController {
  async getAll() {
    try {
      const UrgencyMaintenances = await service.getAll();
      return UrgencyMaintenances;
    } catch (error) {
      throw new Error('Failed to fetch Urgency maintenances');
    }
  }

  async getById(id: number) {
    try {
      const UrgencyMaintenance = await service.getById(id);
      if (!UrgencyMaintenance) {
        return null;  // Return null if not found
      }
      return UrgencyMaintenance;
    } catch (error) {
      throw new Error('Failed to fetch Urgency maintenance');
    }
  }

  async create(name: string, color: string, icon: string, created_by: string) {
    try {
      // Validate the input data
      const { error } = UrgencyMaintenanceSchema.validate({ name, color, icon, created_by });
      if (error) {
        const validationErrors = error.details.map(detail => ({
          message: detail.message,
          path: detail.path.join('.'),
          type: detail.type,
        }));
        throw new ValidationError(JSON.stringify(validationErrors));
      }
      return await service.create(name, color, icon, created_by);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: number, name?: string, color?: string, icon?: string, updated_by?: string) {
    try {
      return await service.update(id, name, color, icon, updated_by);
    } catch (error) {
      throw new Error('Failed to update Urgency maintenance');
    }
  }

  async delete(id: number) {
    try {
      return await service.delete(id);
    } catch (error) {
      throw new Error('Failed to delete Urgency maintenance');
    }
  }
}