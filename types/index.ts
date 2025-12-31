// User types based on Laravel migration
export interface User {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   role: 'ADMIN' | 'USER';
   created_at: string;
   updated_at: string;
}

// Task types based on Laravel migration
export interface Task {
   id: number;
   title: string;
   description: string;
   status: 'PENDING' | 'COMPLETED' | 'CANCELED';
   user_id: number;
   created_at: string;
   updated_at: string;
}

// Form data types
export interface RegisterFormData {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   password_confirmation: string;
}

export interface LoginFormData {
   email: string;
   password: string;
}

export interface TaskFormData {
   title: string;
   description: string;
   status?: 'PENDING' | 'COMPLETED' | 'CANCELED';
}

// Auth context type
export interface AuthContextType {
   user: User | null;
   login: (credentials: LoginFormData) => Promise<void>;
   register: (data: RegisterFormData) => Promise<void>;
   logout: () => void;
   isLoading: boolean;
}