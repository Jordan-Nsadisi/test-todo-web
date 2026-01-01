'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/design-system/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { TaskModal } from '@/components/TaskModal';
import { TaskCard } from '@/components/TaskCard';
import { Task, TaskFormData } from '@/types';
import { CheckSquare, Plus, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/store';
import { useLogout } from '@/hooks/useAuth';
import { useCreateTask, useGetTaskByUser } from '@/hooks/useTasks';

export default function DashboardPage() {
   const router = useRouter();
   const { user } = useAuthStore();
   const logoutMutation = useLogout();
   const createTaskMutation = useCreateTask();
   const getUserTasks = useGetTaskByUser()

   const firstname = user?.firstName;
   const lastName = user?.lastName;

   console.log("user:", user)

   useEffect(() => {
      if (user && user.id) {
         console.log('🔍 Fetching tasks for user:', user.id);
         getUserTasks.mutate(user.id);
      }
   }, [user]);

   // Update tasks state when getUserTasks succeeds
   useEffect(() => {
      if (getUserTasks.isSuccess && getUserTasks.data) {
         console.log('✅ Tasks fetched successfully:', getUserTasks.data);
         setTasks(getUserTasks.data);
      }
   }, [getUserTasks.isSuccess, getUserTasks.data]);

   // Handle getUserTasks error
   useEffect(() => {
      if (getUserTasks.isError) {
         console.error('❌ Failed to fetch tasks:', getUserTasks.error);
      }
   }, [getUserTasks.isError, getUserTasks.error]);

   // Tasks state - will be populated by real API calls
   const [tasks, setTasks] = useState<Task[]>([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   const handleLogout = async () => {
      try {
         await logoutMutation.mutateAsync();
         router.push('/login');
      } catch (error) {
         console.error('Logout failed:', error);
      }
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
      if (editingTask) {
         // TODO: Implement useUpdateTask hook for editing
         console.log('Update task functionality not yet implemented:', editingTask.id, formData);
         setIsModalOpen(false);
         setEditingTask(null);
      } else {
         // Create new task using real API
         try {
            console.log('🔵 Creating new task:', formData);

            const response = await createTaskMutation.mutateAsync(formData);
            console.log('✅ Task created successfully:', response);

            // Add the new task to the local state
            const newTask: Task = {
               id: response.id || Date.now(), // Use API ID or fallback
               ...formData,
               user_id: user?.id || 1,
               status: formData.status || 'PENDING',
               created_at: response.created_at || new Date().toISOString(),
               updated_at: response.updated_at || new Date().toISOString()
            };

            setTasks(prev => [newTask, ...prev]);
            setIsModalOpen(false);
            setEditingTask(null);

         } catch (error) {
            console.error('❌ Failed to create task:', error);
            // Modal stays open on error so user can retry
         }
      }
   };

   const handleDeleteTask = async (taskId: number) => {
      // TODO: Implement useDeleteTask hook
      console.log('Delete task functionality not yet implemented:', taskId);
   };

   const handleStatusChange = async (taskId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
      // TODO: Implement useUpdateTaskStatus hook
      console.log('Update task status functionality not yet implemented:', taskId, status);
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
                           Bienvenue, {firstname} {lastName}
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
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
               {/* Loading State */}
               {getUserTasks.isPending && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {[...Array(3)].map((_, index) => (
                        <Card key={index} className="animate-pulse">
                           <CardHeader className="space-y-3">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                           </CardHeader>
                           <CardContent className="space-y-3">
                              <div className="h-3 bg-gray-200 rounded"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                              <div className="flex space-x-2">
                                 <div className="h-8 bg-gray-200 rounded w-16"></div>
                                 <div className="h-8 bg-gray-200 rounded w-16"></div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               )}

               {/* Error State */}
               {getUserTasks.isError && !getUserTasks.isPending && (
                  <Card className="text-center py-12 border-red-200 bg-red-50">
                     <CardHeader>
                        <CheckSquare className="h-16 w-16 text-red-400 mx-auto mb-4" />
                        <CardTitle className="text-xl text-red-600">
                           Erreur de chargement
                        </CardTitle>
                        <CardDescription className="text-red-500">
                           Impossible de récupérer vos tâches. Vérifiez votre connexion.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Button
                           variant="outline"
                           className="flex items-center space-x-2 mx-auto border-red-300 text-red-600 hover:bg-red-100"
                           onClick={() => getUserTasks.mutate(user?.id!)}
                        >
                           <span>Réessayer</span>
                        </Button>
                     </CardContent>
                  </Card>
               )}

               {/* Empty State */}
               {!getUserTasks.isPending && !getUserTasks.isError && tasks.length === 0 && (
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
               )}

               {/* Tasks Grid */}
               {!getUserTasks.isPending && tasks.length > 0 && (
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
               isLoading={createTaskMutation.isPending}
            />
         </main>
      </div>
   );
}