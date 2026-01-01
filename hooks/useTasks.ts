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

export const useGetTaskByUser = () => {
   return useMutation({
      mutationFn: (userId: string) => tasksServices.getTaskByUser(userId),
      onSuccess: ({ response }: any) => {
         console.log("taches::", response);
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message);
      }
   });
};