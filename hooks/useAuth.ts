import { authService } from "@/services/auth";
import { useAuthStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useRegister = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response: any) => {
      console.log('Register Success:', response);

      if (response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("auth-token", response.token);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
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