'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'loading') return; // 仍在加载中

    if (!session) {
      // 获取当前路径作为回调URL
      const currentPath = window.location.pathname;
      const callbackUrl = searchParams.get('callbackUrl') || currentPath;
      
      // 重定向到登录页面，并保存回调URL
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [session, status, router, searchParams]);

  // 显示加载状态
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 如果没有会话，显示fallback或空内容
  if (!session) {
    return fallback || null;
  }

  // 如果已认证，显示子组件
  return <>{children}</>;
}
