'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/design-system/button';
import { Input } from '@/components/ui/design-system/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/design-system/card';
import { Label } from '@/components/ui/design-system/label';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useRegister } from '@/hooks/useAuth';
import { useAuthStore } from '@/store';
import { useRouter } from "next/navigation";



export default function RegisterPage() {

   const router = useRouter();
   const registerMutation = useRegister();
   const { isAuthenticated, _hasHydrated } = useAuthStore();

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: ''
   });

   useEffect(() => {
      if (_hasHydrated && isAuthenticated) {
         router.replace("/");
      }
   }, [_hasHydrated, isAuthenticated, router]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      console.log('🟡 BEFORE mutation - Register Data:', formData);

      try {
         console.log('🔵 CALLING mutateAsync...');
         await registerMutation.mutateAsync(formData);
         console.log('🟢 Mutation completed successfully');
      } catch (error) {
         console.error('🔴 Registration failed:', error);
      }
   };

   useEffect(() => {
      if (registerMutation.isSuccess) {
         router.replace("/dashboard");
      }
   }, [registerMutation.isSuccess, registerMutation.data]);

   return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
               <CardTitle className="text-xl md:text-2xl font-bold">Créer un compte</CardTitle>
               <CardDescription>
                  Rejoignez-nous pour organiser vos tâches
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                     <div className="space-y-1 md:space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                           id="firstName"
                           name="firstName"
                           type="text"
                           placeholder="Jordan"
                           value={formData.firstName}
                           onChange={handleChange}
                           maxLength={15}
                           required
                        />
                     </div>
                     <div className="space-y-1 md:space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                           id="lastName"
                           name="lastName"
                           type="text"
                           placeholder="Nsadisi"
                           value={formData.lastName}
                           onChange={handleChange}
                           maxLength={15}
                           required
                        />
                     </div>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  <div className="space-y-1 md:space-y-2">
                     <Label htmlFor="password">Mot de passe</Label>
                     <div className="relative">
                        <Input
                           id="password"
                           name="password"
                           type={showPassword ? 'text' : 'password'}
                           placeholder="6-8 caractères"
                           value={formData.password}
                           onChange={handleChange}
                           minLength={6}
                           maxLength={8}
                           required
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="sm"
                           className="absolute right-0 top-0 h-full px-3"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                     <div className="relative">
                        <Input
                           id="password_confirmation"
                           name="password_confirmation"
                           type={showConfirmPassword ? 'text' : 'password'}
                           placeholder="Confirmer le mot de passe"
                           value={formData.password_confirmation}
                           onChange={handleChange}
                           required
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="sm"
                           className="absolute right-0 top-0 h-full px-3"
                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                     </div>
                  </div>

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={registerMutation.isPending}
                     onClick={handleSubmit}
                  >
                     {registerMutation.isPending ? (
                        "Création du compte..."
                     ) : (
                        <>
                           <UserPlus className="mr-2 h-4 w-4" />
                           Créer mon compte
                        </>
                     )}
                  </Button>
               </form>

               <div className="mt-4 md:mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Déjà un compte ? </span>
                  <Link
                     href="/login"
                     className="text-primary hover:underline font-medium"
                  >
                     Se connecter
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}