export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  lastname: string;
  password: string;
  phone: string;
  email: string;
  emprendimiento?: string;
  instagram?: string;
  tamañoOrganizacion?: "1-3" | "4-10" | "11-100";
  actividad?: "Comercio" | "Servicio" | "Industria" | "Tecnología" | "Otro";
  edadEmpresa?: "6 meses" | "+1 año" | "+3 años";
  desafio?: string;
  comoSeEntero?: "Amigo" | "Instagram" | "LinkedIn" | "Ya he venido antes";
  datoCurioso?: string;
  pasion?: string;
  deporte?: string;
  userType: "user";
  source: "mobile";
  // Add any other fields you need for registration
}

export interface validationError {
  email?: string;
  password?: string;
  name?: string;
  lastname?: string;
  phone?: string;
  emprendimiento?: string;
  instagram?: string;
  tamañoOrganizacion?: string;
  actividad?: string;
  edadEmpresa?: string;
  desafio?: string;
  comoSeEntero?: string;
  datoCurioso?: string;
  pasion?: string;
  deporte?: string;
  userType?: string;
  source?: string;
}
export interface AuthState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  validationError: validationError;

  // Form data
  loginForm: LoginForm;
  registerForm: RegisterForm;

  // Form actions
  updateLoginForm: <K extends keyof LoginForm>(
    field: K,
    value: LoginForm[K]
  ) => void;
  updateRegisterForm: <K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K]
  ) => void;
  resetLoginForm: () => void;
  resetRegisterForm: () => void;

  // Auth actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setValidationError: {
    <K extends keyof RegisterForm>(field: K, value: RegisterForm[K]): void;
    <K extends keyof LoginForm>(field: K, value: LoginForm[K]): void;
  };
  clearError: () => void;
  login: () => Promise<ApiResponse>;
  register: () => Promise<ApiResponse>;
  logout: () => void;
}
