// stores/authStore.ts
import { authAPI } from "@/service/api";
import {
  ApiResponse,
  AuthState,
  LoginForm,
  RegisterForm,
  User,
} from "@/types/auth";
import { create } from "zustand";

const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

const initialRegisterForm: RegisterForm = {
  // name: "",
  // lastName: "",
  // whatsapp: "",
  // email: "",
  // emprendimiento: "",
  // instagram: "",
  // tamañoOrganizacion: undefined,
  // actividad: undefined,
  // edadEmpresa: undefined,
  // desafio: "",
  // comoSeEntero: undefined,
  // datoCurioso: "",
  // pasion: "",
  // deporte: "",
  actividad: "Comercio",
  comoSeEntero: "Amigo",
  datoCurioso: "Qwer",
  deporte: "Wwer",
  desafio: "Qwer",
  edadEmpresa: "6 meses",
  email: "adibraed1@gmail.com",
  emprendimiento: "Qwe",
  instagram: "qwe",
  lastName: "Raed",
  name: "Adib",
  pasion: "Qwer",
  tamañoOrganizacion: "1-3",
  whatsapp: "1234",
};

const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginForm: initialLoginForm,
  registerForm: initialRegisterForm,

  // Form actions
  updateLoginForm: (field, value) =>
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [field]: value,
      },
    })),

  updateRegisterForm: (field, value) =>
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        [field]: value,
      },
    })),

  resetLoginForm: () =>
    set({
      loginForm: initialLoginForm,
    }),

  resetRegisterForm: () =>
    set({
      registerForm: initialRegisterForm,
    }),

  // Auth actions
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  clearError: () => set({ error: null }),

  // Login action
  login: async (): Promise<ApiResponse> => {
    set({ isLoading: true, error: null });

    try {
      const response = await authAPI.login(get().loginForm);

      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Reset form after successful login
      get().resetLoginForm();

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  // Register action
  register: async (): Promise<ApiResponse> => {
    try {
      const { registerForm } = get();

      const response = await authAPI.register(registerForm);
      set({ isLoading: true, error: null });

      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Reset form after successful registration
      get().resetRegisterForm();

      return { success: true, data: registerForm };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      set({
        isLoading: false,
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  },

  // Logout action
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      loginForm: initialLoginForm,
      registerForm: initialRegisterForm,
    }),
}));

export default useAuthStore;
export type { ApiResponse, AuthState, LoginForm, RegisterForm, User };
