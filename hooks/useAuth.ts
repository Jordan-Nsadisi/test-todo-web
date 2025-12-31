import { authService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response: any) => {
      console.log(response);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};