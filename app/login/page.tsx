'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/design-system/button';
import { Input } from '@/components/ui/design-system/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { Label } from '@/components/ui/design-system/label';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store';

export default function LoginPage() {
   const router = useRouter();
   const loginMutation = useLogin();
   const { isAuthenticated, _hasHydrated } = useAuthStore();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = { email, password };

      try {
         await loginMutation.mutateAsync(formData);
      } catch (error) {
         //erreur lancé par la mutation
      }
   };

   useEffect(() => {
      if (loginMutation.isSuccess && _hasHydrated && isAuthenticated) {
         router.replace('/dashboard');
      }
   }, [loginMutation.isSuccess, _hasHydrated, isAuthenticated, router]);

   return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
               <CardTitle className="text-xl md:text-2xl font-bold">Se connecter</CardTitle>
               <CardDescription>
                  Entrez vos identifiants pour accéder à vos tâches
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="space-y-1 md:space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>

                  <div className="space-y-1 md:space-y-2">
                     <Label htmlFor="password">Mot de passe</Label>
                     <div className="relative">
                        <Input
                           id="password"
                           type={showPassword ? 'text' : 'password'}
                           placeholder="••••••••"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="sm"
                           className="absolute right-0 top-0 h-full px-3"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <EyeOff className="h-3 w-3 md:h-4 md:w-4" />
                           ) : (
                              <Eye className="h-3 w-3 md:h-4 md:w-4" />
                           )}
                        </Button>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={loginMutation.isPending}
                  >
                     {loginMutation.isPending ? (
                        "Connexion..."
                     ) : (
                        <>
                           <LogIn className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                           Se connecter
                        </>
                     )}
                  </Button>
               </form>

               <div className="mt-4 md:mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Pas encore de compte ? </span>
                  <Link
                     href="/register"
                     className="text-primary hover:underline font-medium"
                  >
                     S'inscrire
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}