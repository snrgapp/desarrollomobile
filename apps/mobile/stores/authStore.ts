// stores/authStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface AuthState {
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

const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

const initialRegisterForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
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
          const { loginForm } = get();

          set({ isLoading: true, error: null });

          try {
            // const response = await fetch("https://your-api.com/auth/login", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(loginForm),
            // });

            // if (!response.ok) {
            //   const errorData = await response.json();
            //   throw new Error(errorData.message || "Login failed");
            // }

            const data: { user: User; token?: string } = {
              user: {
                id: "1",
                name: "John Doe",
                email: "f7Ht2@example.com",
              },
              token: "your-token",
            };
            // await response.json();

            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Reset form after successful login
            get().resetLoginForm();

            return { success: true, data };
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "An unknown error occurred";

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

          if (registerForm.password.length < 6) {
            const errorMessage = "Password must be at least 6 characters";
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          }

          set({ isLoading: true, error: null });

          try {
            const response = await fetch("https://your-api.com/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Registration failed");
            }

            const data: { user: User; token?: string } = await response.json();

            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Reset form after successful registration
            get().resetRegisterForm();

            return { success: true, data };
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "An unknown error occurred";

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
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
export type { User, LoginForm, RegisterForm, ApiResponse, AuthState };
