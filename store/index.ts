import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
   // User state
   user: User | null;
   isAuthenticated: boolean;
   token: string | null;
   isLoading: boolean;
   error: string | null;

   // Hydration state
   _hasHydrated: boolean;

   // Actions
   setUser: (user: User | null) => void;
   setToken: (token: string) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   clearAuth: () => void;
   setHasHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
   devtools(
      persist(
         (set, get) => ({
            //initial state
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
            error: null,
            _hasHydrated: false,

            //actions
            setUser: (user) =>
               set({ user, isAuthenticated: !!user }, false, "setUser"),

            setToken: (token) =>
               set({ token, isAuthenticated: !!token }, false, "setToken"),

            setLoading: (loading) =>
               set({ isLoading: loading }, false, "setLoading"),

            setError: (error) =>
               set({ error }, false, "setError"),

            clearAuth: () =>
               set(
                  {
                     user: null,
                     token: null,
                     isAuthenticated: false,
                     isLoading: false,
                     error: null,
                  },
                  false,
                  "clearAuth"
               ),

            setHasHydrated: () =>
               set({ _hasHydrated: true }, false, "setHasHydrated"),
         }),
         {
            name: "todoApp-auth-store",
            partialize: (state) => ({
               user: state.user,
               token: state.token,
               isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
               state?.setHasHydrated();
            },
         }
      )
   )
);