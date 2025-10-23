import { useTranslations } from 'next-intl';
import ServerAuthGuard from '@/components/example/ServerAuthGuard';

export default function ProtectedTestPage() {
  const t = useTranslations("subscription");

  return (
    <ServerAuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                受保护的测试页面
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                如果您能看到这个页面，说明您已经成功登录！
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServerAuthGuard>
  );
}
