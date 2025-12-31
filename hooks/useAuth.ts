import { authService } from "@/services/auth";
import { useAuthStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useRegister = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response: any) => {

      if (response.user && response.access_token) {
        setUser(response.user);
        setToken(response.access_token);
        localStorage.setItem("auth-token", response.access_token);
      } else {
        console.log('missing user or access_token in response');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response: any) => {

      if (response.user && response.access_token) {
        setUser(response.user);
        setToken(response.access_token);
        localStorage.setItem("auth-token", response.access_token);
        toast.success("Connexion réussie !");
      } else {
        console.log('missing access_token in response');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Erreur de connexion");
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      //nettoyer le store zustand
      clearAuth();

      //supprimer les tokens localStorage
      localStorage.removeItem("auth-token");
      localStorage.removeItem("todoApp-auth-store");
      toast.success("Déconnexion réussie !");
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la déconnexion");
    },
  });
};

export const useCurrentUser = (): any => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["current-user"],
    queryFn: authService.getCurrentUser,
    // onSuccess: (user: any) => setUser(user),
    retry: false,
    staleTime: Infinity,
  });
};