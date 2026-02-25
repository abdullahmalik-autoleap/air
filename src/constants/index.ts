// Application constants

export const APP_CONFIG = {
  name: "Autoleap AIR",
  description: "AI-Powered Phone System for Automotive Shops",
  version: "1.0.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
} as const

export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ONBOARDING: "/onboarding",
  OVERVIEW: "/overview",
  CALLS: "/calls",
  SETTINGS: "/settings",
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },
  CALLS: {
    LIST: "/calls",
    DETAIL: "/calls/:id",
    CREATE: "/calls",
    UPDATE: "/calls/:id",
    DELETE: "/calls/:id",
  },
  SETTINGS: {
    GENERAL: "/settings/general",
    BILLING: "/settings/billing",
    PRIVACY: "/settings/privacy",
    VOICE: "/settings/voice",
  },
} as const

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: "Please enter a valid email address",
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGE: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
  },
  PHONE: {
    PATTERN: /^\+?[\d\s\-\(\)]+$/,
    MESSAGE: "Please enter a valid phone number",
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    MESSAGE: "Name must be between 2 and 50 characters",
  },
} as const

export const UI_CONSTANTS = {
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    EASING: {
      EASE_OUT: "ease-out",
      EASE_IN: "ease-in",
      EASE_IN_OUT: "ease-in-out",
    },
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
} as const

export const THEME_COLORS = {
  PRIMARY: {
    50: "#effdfb",
    100: "#c6f7f2",
    200: "#8eece2",
    300: "#5eddd1",
    400: "#38cbbd",
    500: "#17b3a4",
    600: "#119084",
    700: "#0f7269",
    800: "#0e5954",
    900: "#0c4744",
  },
  GRAY: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  SUCCESS: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  ERROR: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  WARNING: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
} as const

export const CALL_STATUS_LABELS = {
  incoming: "Incoming",
  outgoing: "Outgoing",
  missed: "Missed",
  voicemail: "Voicemail",
  completed: "Completed",
} as const

export const CALL_TYPE_LABELS = {
  inquiry: "Inquiry",
  appointment: "Appointment",
  complaint: "Complaint",
  "follow-up": "Follow-up",
  other: "Other",
} as const

export const BILLING_PLANS = {
  STARTER: {
    id: "starter",
    name: "Starter",
    price: 29,
    features: [
      "Up to 100 calls/month",
      "Basic AI responses",
      "Call recording",
      "Email support",
    ],
  },
  GROWTH: {
    id: "growth",
    name: "Growth",
    price: 79,
    features: [
      "Up to 500 calls/month",
      "Advanced AI responses",
      "Call recording & transcription",
      "Priority support",
      "Analytics dashboard",
    ],
  },
  ENTERPRISE: {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    features: [
      "Unlimited calls",
      "Custom AI training",
      "Full call analytics",
      "Dedicated support",
      "Custom integrations",
    ],
  },
} as const

export const ONBOARDING_STEPS = [
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Tell us about yourself and your shop",
    isOptional: false,
  },
  {
    id: "business-info",
    title: "Business Information",
    description: "Share details about your services and hours",
    isOptional: false,
  },
  {
    id: "voice-setup",
    title: "Voice Setup",
    description: "Configure your AI voice assistant",
    isOptional: false,
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "Set your notification and display preferences",
    isOptional: true,
  },
] as const

export const NOTIFICATION_TYPES = {
  CALL_RECEIVED: "call_received",
  CALL_MISSED: "call_missed",
  VOICEMAIL_RECEIVED: "voicemail_received",
  APPOINTMENT_REMINDER: "appointment_reminder",
  BILLING_REMINDER: "billing_reminder",
  SYSTEM_UPDATE: "system_update",
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme",
  ONBOARDING_PROGRESS: "onboarding_progress",
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  TIMEOUT: "Request timed out. Please try again.",
} as const

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  REGISTER_SUCCESS: "Account created successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  SETTINGS_SAVED: "Settings saved successfully!",
  CALL_SAVED: "Call details saved!",
  DATA_EXPORTED: "Data exported successfully!",
} as const
