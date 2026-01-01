import { tasksServices } from "@/services/tasks";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCreateTask = () => {
   return useMutation({
      mutationFn: tasksServices.creatTask,
      onSuccess: (response: any) => {
         console.log({ response });
         toast.success("Produit crée avec succès");
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message);
      }
   });
};