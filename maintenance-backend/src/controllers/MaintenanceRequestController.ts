import { MaintenanceRequestService } from '../services/MaintenanceRequestService';
import { MaintenanceRequestSchema } from '../validation/MaintenanceRequestValidation';
import { ValidationError } from '../errors/ValidationError';

const service = new MaintenanceRequestService();

export class MaintenanceRequestController {
  async getMaintenanceStats() {
    try {
      const openRequests = await service.getOpenRequestsCount();
      const urgentRequests = await service.getUrgentRequestsCount();
      const averageResolutionTime = await service.getAverageResolutionTime();
      console.log(openRequests, urgentRequests, averageResolutionTime);
      return {
        openRequests,
        urgentRequests,
        averageResolutionTime,
      };
    } catch (error) {
      throw new Error('Failed to fetch maintenance stats');
    }
  }

  async getAll(page: number, pageSize: number) {
    try {
      return await service.getAll(page, pageSize);
    } catch (error) {
      throw new Error('Failed to fetch maintenance requests');
    }
  }

  async getById(id: number) {
    try {
      const MaintenanceRequest = await service.getById(id);
      if (!MaintenanceRequest) {
        return null;  // Return null if not found
      }
      return MaintenanceRequest;
    } catch (error) {
      throw new Error('Failed to fetch Maintenance Request');
    }
  }

  async create(title: string, description: string, status_maintenance_id: number, urgency_maintenance_id: number, created_by: string) {
    try {
      // Validate the input data
      const { error } = MaintenanceRequestSchema.validate({ title, description, status_maintenance_id, urgency_maintenance_id, created_by });
      if (error) {
        const validationErrors = error.details.map(detail => ({
          message: detail.message,
          path: detail.path.join('.'),
          type: detail.type,
        }));
        throw new ValidationError(JSON.stringify(validationErrors));
      }
      return await service.create(title, description, status_maintenance_id, urgency_maintenance_id, created_by);
    } catch (error: any) {
      throw error;
    }
  }

  async updateStatus(id: number, status_maintenance_id?: number, updated_by?: string) {
    try {
      return await service.updateStatus(id, status_maintenance_id, updated_by);
    } catch (error) {
      throw new Error('Failed to update Maintenance Request');
    }
  }

  async update(id: number, title?: string, description?: string, status_maintenance_id?: number, urgency_maintenance_id?: number, updated_by?: string) {
    try {
      return await service.update(id, title, description, status_maintenance_id, urgency_maintenance_id, updated_by);
    } catch (error) {
      throw new Error('Failed to update Maintenance Request');
    }
  }

  async delete(id: number) {
    try {
      return await service.delete(id);
    } catch (error) {
      throw new Error('Failed to delete Maintenance Request');
    }
  }
}