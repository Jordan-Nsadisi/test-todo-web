'use client';

import { useState, useEffect } from 'react';
import { User, Task, LoginFormData, RegisterFormData } from '@/types';

// Mock data
const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'Jordan',
    lastName: 'Nsadisi',
    email: 'jordan@example.com',
    role: 'USER',
    created_at: '2024-01-15T10:30:00.000Z',
    updated_at: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie@example.com',
    role: 'USER',
    created_at: '2024-01-10T09:15:00.000Z',
    updated_at: '2024-01-10T09:15:00.000Z'
  }
];

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Finaliser le projet',
    description: 'Terminer le développement de l\'application todo avec toutes les fonctionnalités requises',
    status: 'PENDING',
    user_id: 1,
    created_at: '2024-01-20T14:30:00.000Z',
    updated_at: '2024-01-20T14:30:00.000Z'
  },
  {
    id: 2,
    title: 'Réviser le code',
    description: 'Effectuer une revue complète du code et optimiser les performances',
    status: 'COMPLETED',
    user_id: 1,
    created_at: '2024-01-18T11:20:00.000Z',
    updated_at: '2024-01-21T16:45:00.000Z'
  }
];

export function useMockAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate checking for stored auth
    const storedUser = localStorage.getItem('mock-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginFormData): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (foundUser && credentials.password === 'password') {
      setUser(foundUser);
      localStorage.setItem('mock-user', JSON.stringify(foundUser));
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    setIsLoading(false);
  };

  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newUser: User = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: 'USER',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('mock-user', JSON.stringify(newUser));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock-user');
  };

  return {
    user,
    login,
    register,
    logout,
    isLoading
  };
}

export function useMockTasks(userId?: number) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const getUserTasks = (uid: number) => {
    return tasks.filter(task => task.user_id === uid);
  };

  return {
    tasks: userId ? getUserTasks(userId) : [],
    setTasks
  };
}