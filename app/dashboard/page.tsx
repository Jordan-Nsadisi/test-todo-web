'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/design-system/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { TaskModal } from '@/components/TaskModal';
import { TaskCard } from '@/components/TaskCard';
import { Task, TaskFormData } from '@/types';
import { CheckSquare, Plus, LogOut, User } from 'lucide-react';

export default function DashboardPage() {
  // Mock user data - TODO: Replace with real auth
  const user = {
    firstName: 'Jordan',
    lastName: 'Nsadisi'
  };

  // Mock tasks data with some examples
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData: TaskFormData) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...formData, updated_at: new Date().toISOString() }
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now(),
        ...formData,
        user_id: 1,
        status: formData.status || 'PENDING',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setTasks(prev => [newTask, ...prev]);
    }
    
    setIsLoading(false);
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleStatusChange = async (taskId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status, updated_at: new Date().toISOString() }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckSquare className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Bienvenue, {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Mes Tâches</h2>
            <p className="text-muted-foreground mt-1">
              Gérez et organisez vos activités quotidiennes
            </p>
          </div>
          
          <Button className="flex items-center space-x-2" onClick={handleOpenModal}>
            <Plus className="h-4 w-4" />
            <span>Nouvelle tâche</span>
          </Button>
        </div>

        {/* Tasks Content */}
        <div className="space-y-6">
          {tasks.length === 0 ? (
            <Card className="text-center py-12">
              <CardHeader>
                <CheckSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <CardTitle className="text-xl text-muted-foreground">
                  Aucune tâche pour le moment
                </CardTitle>
                <CardDescription>
                  Vous n'avez pas encore défini de tâches. 
                  Commencez par créer votre première tâche !
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="flex items-center space-x-2 mx-auto" onClick={handleOpenModal}>
                  <Plus className="h-4 w-4" />
                  <span>Créer ma première tâche</span>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}