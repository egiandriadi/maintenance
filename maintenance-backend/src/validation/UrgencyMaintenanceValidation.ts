// src/validation/UrgencyMaintenanceValidation.ts

import Joi from 'joi';

// Define the validation schema
export const UrgencyMaintenanceSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  color: Joi.string().valid('red', 'green', 'blue', 'yellow').required(),
  created_by: Joi.string().min(3).max(30).required(),
});