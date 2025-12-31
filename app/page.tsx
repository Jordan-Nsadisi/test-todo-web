import Link from 'next/link';
import { Button } from "@/components/ui/design-system/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { CheckSquare, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">TodoApp</h1>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Organisez vos tâches
              <br />
              <span className="text-primary">en toute simplicité</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une application moderne et intuitive pour gérer efficacement
              vos projets et atteindre vos objectifs.
            </p>
          </div>

          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/register">
                Commencer gratuitement
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">
                J'ai déjà un compte
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <Card>
            <CardHeader>
              <CheckSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Gestion simple</CardTitle>
              <CardDescription>
                Créez, modifiez et suivez vos tâches en quelques clics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Interface moderne</CardTitle>
              <CardDescription>
                Design épuré et responsive adapté à tous vos appareils
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Productivité</CardTitle>
              <CardDescription>
                Organisez votre travail et boostez votre efficacité
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
