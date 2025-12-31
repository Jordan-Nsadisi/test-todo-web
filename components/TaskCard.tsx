'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/design-system/button';
import { Card, CardContent, CardHeader } from '@/components/ui/design-system/card';
import { Badge } from '@/components/ui/design-system/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/design-system/dropdown-menu';
import { Task } from '@/types';
import { Edit, Trash2, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TaskCardProps {
   task: Task;
   onEdit: (task: Task) => void;
   onDelete: (taskId: number) => void;
   onStatusChange: (taskId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELED') => void;
}

const statusConfig = {
   PENDING: {
      label: 'En attente',
      icon: Clock,
      variant: 'secondary' as const,
      color: 'text-yellow-600'
   },
   COMPLETED: {
      label: 'Terminée',
      icon: CheckCircle,
      variant: 'default' as const,
      color: 'text-green-600'
   },
   CANCELED: {
      label: 'Annulée',
      icon: XCircle,
      variant: 'destructive' as const,
      color: 'text-red-600'
   }
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
   const [isLoading, setIsLoading] = useState(false);
   const statusInfo = statusConfig[task.status];
   const StatusIcon = statusInfo.icon;

   const handleEdit = () => {
      onEdit(task);
   };

   const handleDelete = async () => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
         setIsLoading(true);
         try {
            await onDelete(task.id);
         } finally {
            setIsLoading(false);
         }
      }
   };

   const handleStatusChange = async (newStatus: 'PENDING' | 'COMPLETED' | 'CANCELED') => {
      setIsLoading(true);
      try {
         await onStatusChange(task.id, newStatus);
      } finally {
         setIsLoading(false);
      }
   };

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('fr-FR', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit'
      });
   };

   return (
      <Card className="hover:shadow-md transition-shadow">
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                     <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                        {task.title}
                     </h3>
                     <Badge variant={statusInfo.variant} className="flex items-center space-x-1">
                        <StatusIcon className="h-3 w-3" />
                        <span>{statusInfo.label}</span>
                     </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     Créée le {formatDate(task.created_at)}
                  </p>
               </div>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="sm" disabled={isLoading}>
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => handleStatusChange('PENDING')}
                        disabled={task.status === 'PENDING'}
                     >
                        <Clock className="mr-2 h-4 w-4" />
                        Marquer en attente
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => handleStatusChange('COMPLETED')}
                        disabled={task.status === 'COMPLETED'}
                     >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Marquer terminée
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => handleStatusChange('CANCELED')}
                        disabled={task.status === 'CANCELED'}
                     >
                        <XCircle className="mr-2 h-4 w-4" />
                        Marquer annulée
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive focus:text-destructive"
                     >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </CardHeader>

         <CardContent className="pt-0">
            <p className="text-foreground leading-relaxed line-clamp-3">
               {task.description}
            </p>

            {task.updated_at !== task.created_at && (
               <p className="text-xs text-muted-foreground mt-3">
                  Modifiée le {formatDate(task.updated_at)}
               </p>
            )}
         </CardContent>
      </Card>
   );
}