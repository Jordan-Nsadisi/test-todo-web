'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/design-system/button';
import { Input } from '@/components/ui/design-system/input';
import { Textarea } from '@/components/ui/design-system/textarea';
import { Label } from '@/components/ui/design-system/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/design-system/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/design-system/dialog';
import { Task, TaskFormData } from '@/types';
import { Save, X } from 'lucide-react';

interface TaskModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSave: (data: TaskFormData) => void;
   task?: Task | null; // For editing existing task
   isLoading?: boolean;
}

export function TaskModal({ isOpen, onClose, onSave, task = null, isLoading = false }: TaskModalProps) {
   const [formData, setFormData] = useState<TaskFormData>({
      title: '',
      description: '',
      status: 'PENDING'
   });

   // Reset form when modal opens/closes or task changes
   useEffect(() => {
      if (isOpen) {
         if (task) {
            // Editing existing task
            setFormData({
               title: task.title,
               description: task.description,
               status: task.status
            });
         } else {
            // Creating new task
            setFormData({
               title: '',
               description: '',
               status: 'PENDING'
            });
         }
      }
   }, [isOpen, task]);

   const handleChange = (field: keyof TaskFormData, value: string) => {
      setFormData(prev => ({
         ...prev,
         [field]: value
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
   };

   const handleClose = () => {
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-2">
                  <span>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</span>
               </DialogTitle>
               <DialogDescription>
                  {task
                     ? 'Modifiez les informations de votre tâche'
                     : 'Créez une nouvelle tâche pour organiser votre travail'
                  }
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                     id="title"
                     type="text"
                     placeholder="Entrez le titre de la tâche"
                     value={formData.title}
                     onChange={(e) => handleChange('title', e.target.value)}
                     maxLength={25}
                     required
                  />
                  <p className="text-xs text-muted-foreground">
                     {formData.title.length}/25 caractères
                  </p>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                     id="description"
                     placeholder="Décrivez votre tâche en détail..."
                     value={formData.description}
                     onChange={(e) => handleChange('description', e.target.value)}
                     rows={4}
                     required
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                     value={formData.status}
                     onValueChange={(value) => handleChange('status', value)}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="PENDING">En attente</SelectItem>
                        <SelectItem value="COMPLETED">Terminée</SelectItem>
                        <SelectItem value="CANCELED">Annulée</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <DialogFooter className="flex space-x-2">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={handleClose}
                     disabled={isLoading}
                  >
                     <X className="mr-2 h-4 w-4" />
                     Annuler
                  </Button>
                  <Button
                     type="submit"
                     disabled={isLoading || !formData.title.trim() || !formData.description.trim()}
                  >
                     {isLoading ? (
                        "Sauvegarde..."
                     ) : (
                        <>
                           <Save className="mr-2 h-4 w-4" />
                           {task ? 'Mettre à jour' : 'Créer'}
                        </>
                     )}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}