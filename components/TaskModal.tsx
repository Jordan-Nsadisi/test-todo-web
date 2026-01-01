'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/design-system/button';
import { Input } from '@/components/ui/design-system/input';
import { Textarea } from '@/components/ui/design-system/textarea';
import { Label } from '@/components/ui/design-system/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/design-system/dialog';
import { Task, TaskFormData } from '@/types';
import { Save, X } from 'lucide-react';

interface TaskModalProps {
   isOpen: boolean; //pour contrôler l'ouverture du modal
   onClose: () => void; //pour fermer le modal
   onSave: (data: TaskFormData) => void; //pour sauvegarder la tâche
   task?: Task | null; //pour modifier une tâche existante
   isLoading?: boolean;
}

export function TaskModal({ isOpen, onClose, onSave, task = null, isLoading = false }: TaskModalProps) {
   const [formData, setFormData] = useState<TaskFormData>({
      title: '',
      description: '',
      status: 'PENDING'
   });

   //remplir le formulaire si on modifie une tâche
   useEffect(() => {
      if (isOpen) {
         if (task) {
            //la tâche existe, on est en mode édition
            setFormData({
               title: task.title,
               description: task.description,
               status: task.status
            });
         } else {
            
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
         <DialogContent className="sm:max-w-[500px] bg-white dark:bg-white border-2 shadow-xl">
            <DialogHeader className="pb-3 md:pb-4 border-b">
               <DialogTitle className="flex items-center space-x-1 md:space-x-2 text-base md:text-lg font-semibold">
                  <span>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</span>
               </DialogTitle>
               <DialogDescription className="text-muted-foreground text-sm">
                  {task
                     ? 'Modifiez les informations de votre tâche'
                     : 'Créez une nouvelle tâche pour organiser votre travail'
                  }
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pt-3 md:pt-4">
               <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Titre *</Label>
                  <Input
                     id="title"
                     type="text"
                     placeholder="Entrez le titre de la tâche"
                     value={formData.title}
                     onChange={(e) => handleChange('title', e.target.value)}
                     maxLength={25}
                     required
                     className="bg-white"
                  />
                  <p className="text-xs text-muted-foreground">
                     {formData.title.length}/25 caractères
                  </p>
               </div>

               <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                  <Textarea
                     id="description"
                     placeholder="Décrivez votre tâche en détail..."
                     value={formData.description}
                     onChange={(e) => handleChange('description', e.target.value)}
                     rows={4}
                     required
                     className="bg-white resize-none"
                  />
               </div>

               <DialogFooter className="flex space-x-2 pt-3 md:pt-4 border-t">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={handleClose}
                     disabled={isLoading}
                     className="flex-1 sm:flex-none"
                  >
                     <X className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                     Annuler
                  </Button>
                  <Button
                     type="submit"
                     disabled={isLoading || !formData.title.trim() || !formData.description.trim()}
                     className="flex-1 sm:flex-none"
                  >
                     {isLoading ? (
                        "Sauvegarde..."
                     ) : (
                        <>
                           <Save className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
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