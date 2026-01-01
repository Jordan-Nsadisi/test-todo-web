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
import { useCreateTask, useGetTaskByUser, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';

export default function DashboardPage() {
   const router = useRouter();
   const { user, isAuthenticated, _hasHydrated } = useAuthStore();
   const logoutMutation = useLogout();
   const createTaskMutation = useCreateTask();
   const updateTaskMutation = useUpdateTask();
   const deleteTaskMutation = useDeleteTask();
   const getUserTasks = useGetTaskByUser()

   const firstname = user?.firstName;
   const lastName = user?.lastName;

   const [tasks, setTasks] = useState<Task[]>([]); //pour optimiser le rendu
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   // Vérification d'authentification et d'hydration
   useEffect(() => {
      if (_hasHydrated && !isAuthenticated) {
         router.push('/login');
      }
   }, [_hasHydrated, isAuthenticated, router]);

   console.log("user:", user)

   useEffect(() => {
      if (user && user.id) {
         getUserTasks.mutate(user.id);
      }
   }, [user]);

   useEffect(() => {
      if (getUserTasks.isSuccess && getUserTasks.data) {
         setTasks(getUserTasks.data.tasks);
      } else {
         setTasks([]);
      }
   }, [getUserTasks.isSuccess, getUserTasks.data]);

   const handleLogout = async () => {
      try {
         await logoutMutation.mutateAsync();
         router.push('/login');
      } catch (error) {
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
         //mis à jour
         try {
            const response = await updateTaskMutation.mutateAsync({
               id: editingTask.id,
               updates: formData
            });

            setTasks(prev => prev.map(task =>
               task.id === editingTask.id
                  ? {
                     ...task,
                     ...formData,
                     updated_at: response.updated_at
                  }
                  : task
            ));

            setIsModalOpen(false);
            setEditingTask(null);

         } catch (error) {
         }
      } else {
         // Create new task using real API
         try {
            const response = await createTaskMutation.mutateAsync(formData);

            // Add the new task to the local state
            const newTask: Task = {
               id: response.id || Date.now(), // Use API ID or fallback
               ...formData,
               user_id: user?.id || 1,
               status: formData.status || 'PENDING',
               created_at: response.created_at,
               updated_at: response.updated_at
            };

            setTasks(prev => [newTask, ...prev]);
            setIsModalOpen(false);
            setEditingTask(null);

         } catch (error) {
         }
      }
   };

   const handleDeleteTask = async (taskId: number) => {

      const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
      if (!isConfirmed) return;

      try {

         await deleteTaskMutation.mutateAsync(taskId);

         //supprimer du state local
         setTasks(prev => prev.filter(task => task.id !== taskId));

      } catch (error) {
      }
   };

   const handleStatusChange = async (taskId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
      try {

         await updateTaskMutation.mutateAsync({
            id: taskId,
            updates: { status }
         });

         console.log('✅ Task status updated successfully');

         setTasks(prev => prev.map(task =>
            task.id === taskId
               ? { ...task, status, updated_at: new Date().toISOString() }
               : task
         ));

      } catch (error) {
         console.error('❌ Failed to update task status:', error);
      }
   };

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="border-b border-border bg-card">
            <div className="container mx-auto px-4 py-3 md:py-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                     <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                     <div>
                        <h1 className="text-lg md:text-2xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-xs md:text-sm text-muted-foreground">
                           Bienvenue, {firstname} {lastName}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center space-x-2 md:space-x-4">
                     <Button variant="outline" size="sm">
                        <User className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Profil</span>
                     </Button>
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                     >
                        <LogOut className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Déconnexion</span>
                     </Button>
                  </div>
               </div>
            </div>
         </header>

         {/* main*/}
         <main className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mes Tâches</h2>
                  <p className="text-muted-foreground text-sm md:text-base mt-1">
                     Gérez et organisez vos activités quotidiennes
                  </p>
               </div>

               <Button className="flex items-center space-x-1 md:space-x-2" onClick={handleOpenModal}>
                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Nouvelle tâche</span>
                  <span className="sm:hidden">Nouvelle</span>
               </Button>
            </div>

            {/* tasks */}
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

               {/* errors stats */}
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

               {/* null tasks */}
               {!getUserTasks.isPending && !getUserTasks.isError && tasks.length === 0 && (
                  <Card className="text-center py-8 md:py-12">
                     <CardHeader>
                        <CheckSquare className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 md:mb-4" />
                        <CardTitle className="text-lg md:text-xl text-muted-foreground">
                           Aucune tâche pour le moment
                        </CardTitle>
                        <CardDescription className="text-sm md:text-base">
                           Vous n'avez pas encore défini de tâches.
                           Commencez par créer votre première tâche !
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Button className="flex items-center space-x-1 md:space-x-2 mx-auto" onClick={handleOpenModal}>
                           <Plus className="h-3 w-3 md:h-4 md:w-4" />
                           <span>Créer ma première tâche</span>
                        </Button>
                     </CardContent>
                  </Card>
               )}

               {/* tasks grid */}
               {!getUserTasks.isPending && tasks.length > 0 && (
                  <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
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

            {/* task modal */}
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