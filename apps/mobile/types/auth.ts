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
}

export interface RegisterForm {
  name: string;
  lastName: string;
  whatsapp: string;
  email: string;
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
  // Add any other fields you need for registration
}

export interface AuthState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Form data
  loginForm: LoginForm;
  registerForm: RegisterForm;

  // Form actions
  updateLoginForm: (field: keyof LoginForm, value: string) => void;
  updateRegisterForm: (field: keyof RegisterForm, value: string) => void;
  resetLoginForm: () => void;
  resetRegisterForm: () => void;

  // Auth actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  login: () => Promise<ApiResponse>;
  register: () => Promise<ApiResponse>;
  logout: () => void;
}
