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
  name: "",
  lastName: "",
  whatsapp: "",
  email: "",
  emprendimiento: "",
  instagram: "",
  tamañoOrganizacion: "",
  actividad: "",
  edadEmpresa: "",
  desafio: "",
  comoSeEntero: "",
  datoCurioso: "",
  pasion: "",
  deporte: "",
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
    const { registerForm } = get();

    // if (registerForm.password.length < 6) {
    //   const errorMessage = "Password must be at least 6 characters";
    //   set({ error: errorMessage });
    //   return { success: false, error: errorMessage };
    // }

    set({ isLoading: true, error: null });

    try {
      // const response = await fetch("https://your-api.com/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: registerForm.name,
      //     email: registerForm.email,
      //     password: registerForm.password,
      //   }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Registration failed");
      // }

      // const data: { user: User; token?: string } = await response.json();
      const data = {
        user: {
          id: "1",
          name: "Jane Doe",
          email: "jane@test.com",
        },
      };
      set({
        user: data.user,
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
