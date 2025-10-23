/**
 * @description: server auth guard component
 * @param children: React.ReactNode - 子组件
 * @param redirectTo: string - 重定向的
 * @returns {React.ReactNode} server auth guard component
 */
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
  
  return children;
}
