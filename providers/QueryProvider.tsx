"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function QueryProvider({ children }: { children: ReactNode }) {

   const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes (remplace cacheTime en React Query v5)
         },
      },
   }));

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <Toaster
            position='top-right'
            toastOptions={{
               duration: 4000,
               style: {
                  background: '#ffffff',
                  color: '#1f2937',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
               },
               success: {
                  style: {
                     background: '#10b981',
                     color: '#ffffff',
                  },
               },
               error: {
                  style: {
                     background: '#ef4444',
                     color: '#ffffff',
                  },
               },
            }}
         />
      </QueryClientProvider>
   );
}