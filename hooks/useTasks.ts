import { tasksServices } from "@/services/tasks";
import { TaskFormData } from "@/types";
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
      mutationFn: (userId: number) => tasksServices.getTaskByUser(userId),
      onSuccess: ({ response }: any) => {
         console.log("taches::", response);
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message);
      }
   });
};

export const useUpdateTask = () => {
   return useMutation({
      mutationFn: ({ id, updates }: { id: number; updates: Partial<TaskFormData> }) =>
         tasksServices.updateTask(id, updates),
      onSuccess: (response: any) => {
         toast.success("Tâche mise à jour avec succès !");
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message)
      }
   });
};