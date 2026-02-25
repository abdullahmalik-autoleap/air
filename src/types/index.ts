// Common types used across the application

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// User related types
export interface User extends BaseEntity {
  email: string
  name: string
  shopName: string
  address: string
  phone: string
  isEmailVerified: boolean
  role: UserRole
}

export type UserRole = "owner" | "admin" | "staff"

// Auth related types
export interface AuthUser {
  id: string
  email: string
  name: string
  shopName: string
  role: UserRole
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  shopName: string
  address: string
  phone: string
}

// Call related types
export interface Call extends BaseEntity {
  id: string
  phoneNumber: string
  customerName?: string
  customerPhone: string
  duration: number
  status: CallStatus
  type: CallType
  recordingUrl?: string
  transcript?: string
  summary?: string
  tags: string[]
  notes?: string
}

export type CallStatus = "incoming" | "outgoing" | "missed" | "voicemail" | "completed"
export type CallType = "inquiry" | "appointment" | "complaint" | "follow-up" | "other"

// Onboarding types
export interface OnboardingStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isOptional: boolean
}

export interface OnboardingData {
  personalInfo: {
    name: string
    shopName: string
    address: string
    phone: string
  }
  businessInfo: {
    services: string[]
    hours: BusinessHours
    website?: string
  }
  preferences: {
    notifications: NotificationPreferences
    voiceSettings: VoiceSettings
  }
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  callAlerts: boolean
}

export interface VoiceSettings {
  voiceId: string
  speed: number
  pitch: number
  volume: number
}

// Settings types
export interface Settings {
  general: GeneralSettings
  billing: BillingSettings
  privacy: PrivacySettings
  voice: VoiceSettings
  notifications: NotificationPreferences
}

export interface GeneralSettings {
  shopName: string
  address: string
  phone: string
  email: string
  website?: string
  timezone: string
  language: string
}

export interface BillingSettings {
  plan: BillingPlan
  paymentMethod: PaymentMethod
  billingAddress: Address
  invoiceEmail: string
}

export interface PrivacySettings {
  dataRetention: number
  recordingConsent: boolean
  shareAnalytics: boolean
  marketingEmails: boolean
}

export type BillingPlan = "starter" | "growth" | "enterprise"

export interface PaymentMethod {
  type: "card" | "bank" | "paypal"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isValid: boolean
}

// UI Component types
export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Event types
export interface CustomEvent<T = unknown> {
  type: string
  payload: T
  timestamp: Date
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
    input: string
    ring: string
  }
  fonts: {
    sans: string
    mono: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
}
