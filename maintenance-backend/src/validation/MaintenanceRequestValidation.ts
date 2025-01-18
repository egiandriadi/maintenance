// src/validation/MaintenanceRequestValidation.ts

import Joi from 'joi';

// Define the validation schema
export const MaintenanceRequestSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).required(),
  status_maintenance_id: Joi.required(),
  urgency_maintenance_id: Joi.required(),
  created_by: Joi.string().min(3).max(30).required(),
});