import Link from 'next/link';
import { Button } from "@/components/ui/design-system/button";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { CheckSquare, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-1 md:space-x-2">
            <CheckSquare className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">TodoApp</h1>
          </div>
          <div className="space-x-2 md:space-x-4">
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
        <div className="text-center space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground">
              Organisez vos tâches
              <br />
              <span className="text-primary">en toute simplicité</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Une application moderne et intuitive pour gérer efficacement
              vos projets et atteindre vos objectifs.
            </p>
          </div>

          <div className="hidden md:inline-block space-x-4">
            <Button size="default" className="md:text-base" asChild>
              <Link href="/register">
                Commencer gratuitement
              </Link>
            </Button>
            <Button variant="outline" size="default" className="md:text-base" asChild>
              <Link href="/login">
                J'ai déjà un compte
              </Link>
            </Button>
          </div>

          {/* mobile ui button  */}
          <div className="md:hidden flex flex-col space-y-2 w-fit mx-auto">
            <Button size="sm" asChild>
              <Link href="/register">
                Commencer gratuitement
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                J'ai déjà un compte
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
          <Card>
            <CardHeader>
              <CheckSquare className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <CardTitle>Gestion simple</CardTitle>
              <CardDescription>
                Créez, modifiez et suivez vos tâches en quelques clics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <CardTitle>Interface moderne</CardTitle>
              <CardDescription>
                Design épuré et responsive adapté à tous vos appareils
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
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
