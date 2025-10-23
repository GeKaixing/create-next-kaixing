import { auth } from '@/library/auth/auth';
import { redirect } from 'next/navigation';

interface ServerAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default async function ServerAuthGuard({ 
  children, 
  redirectTo = '/login' 
}: ServerAuthGuardProps) {
  const session = await auth();
  
  if (!session?.user) {
    redirect(redirectTo);
  }
  
  return <>{children}</>;
}
