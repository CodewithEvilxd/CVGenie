// API Constants
export const API_ROUTES = {
  AUTH: {
    GOOGLE: '/api/auth/[...nextauth]',
    SIGNUP: '/api/user/signup',
  },
  CONTACT: '/api/contact',
} as const;

// Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
} as const;

// UI Constants
export const UI = {
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300,
} as const;

// Resume Constants
export const RESUME = {
  MAX_SECTIONS: 10,
  MAX_SKILLS: 20,
  MAX_EXPERIENCES: 15,
  MAX_EDUCATION: 5,
  MAX_PROJECTS: 10,
  MAX_ACHIEVEMENTS: 15,
} as const;

// File Constants
export const FILE = {
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
} as const;

// External Links
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/codewithevilxd',
  DISCORD: 'https://discord.gg/raj.dev_',
  LINKEDIN: 'https://linkedin.com/in/codewithevilxd',
  PORTFOLIO: 'https://codewithevilxd.dev',
} as const;