import { API_ENDPOINTS } from "@/utils/constant";
import API from "./api";
import { auth, user } from "@/utils/apiRoutes";
import { LoginFormData, RegisterFormData, User } from "@/types";


export const authService = {

   async register(data: RegisterFormData): Promise<any> {
      const response: any = await API.post(
         `${API_ENDPOINTS.auth}${auth.register}`,
         data
      );

      return response.data;
   },

   async login(credentials: LoginFormData): Promise<User> {
      const response = await API.post<User>(
         `${API_ENDPOINTS.auth}${auth.login}`,
         credentials
      );
      return response.data;
   },

   async logout() {
      localStorage.removeItem("todoApp-auth-store");
      return Promise.resolve();
   },

   async getCurrentUser() {
      const token = localStorage.getItem("todoApp-auth-store");
      if (!token) {
         throw new Error("Non authentifié");
      }

      try {
         const response = await API.get(
            `${API_ENDPOINTS.user}${user.profile}`
         );
         return response.data;
      } catch (error) {
         throw new Error("Erreur lors de la récupération de l'utilisateur");
      }
   },
};