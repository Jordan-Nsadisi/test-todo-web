'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/design-system/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { CheckSquare, Plus, LogOut, User } from 'lucide-react';

export default function DashboardPage() {
  // Mock user data - TODO: Replace with real auth
  const user = {
    firstName: 'Jordan',
    lastName: 'Nsadisi'
  };

  // Mock tasks data - TODO: Replace with real data
  const [tasks] = useState([]);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
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
          
          <Button className="flex items-center space-x-2">
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
                <Button className="flex items-center space-x-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  <span>Créer ma première tâche</span>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {/* TODO: Tasks list will be here */}
              <p className="text-muted-foreground">Liste des tâches à implémenter</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}