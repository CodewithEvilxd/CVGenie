import { VALIDATION } from './constants';

// Email validation
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return VALIDATION.EMAIL_REGEX.test(email.trim());
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
};

export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/\d/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[^a-zA-Z\d]/.test(password)) score++;
  else feedback.push('Include special characters');

  return { score, feedback };
};

// Name validation
export const isValidName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= VALIDATION.NAME_MAX_LENGTH;
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  return VALIDATION.PHONE_REGEX.test(phone.trim());
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Form validation helpers
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!isValidName(data.name)) {
    errors.name = 'Name is required and must be less than 50 characters';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(data.subject)) {
    errors.subject = 'Subject is required';
  }

  if (!isRequired(data.message) || data.message.trim().length < 10) {
    errors.message = 'Message is required and must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignupForm = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!isValidName(data.name)) {
    errors.name = 'Name is required and must be less than 50 characters';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isValidPassword(data.password)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSigninForm = (data: {
  email: string;
  password: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitization helpers
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
};