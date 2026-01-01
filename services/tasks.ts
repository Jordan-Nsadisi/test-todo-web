import { API_ENDPOINTS } from "@/utils/constant";
import API from "./api";
import { tasks } from "@/utils/apiRoutes";
import { TaskFormData } from "@/types";


export const tasksServices = {

   async creatTask(task: TaskFormData): Promise<any> {
      const response = await API.post<TaskFormData>(
         `${API_ENDPOINTS.task}${tasks.create}`,
         task
      );
      return response.data;
   },

   async getTaskByUser(userId: number): Promise<any> {
      const response = await API.get(
         `${API_ENDPOINTS.task}${tasks.getTaskByUser}${userId}`
      );
      return response.data;
   },

}