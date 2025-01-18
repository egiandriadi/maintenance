// src/validation/statusMaintenanceValidation.ts

import Joi from 'joi';

// Define the validation schema
export const StatusMaintenanceSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  color: Joi.string().valid('red', 'green', 'blue', 'yellow').required(),
  created_by: Joi.string().min(3).max(30).required(),
});