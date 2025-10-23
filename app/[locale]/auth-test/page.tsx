import { useTranslations } from 'next-intl';
import ServerAuthGuard from '@/components/example/ServerAuthGuard';

export default function AuthTestPage() {
  const t = useTranslations("subscription");

  return (
    <ServerAuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                多语言认证测试页面
              </h1>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  如果您能看到这个页面，说明多语言认证功能正常工作！
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                    测试说明
                  </h2>
                  <ul className="text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• 访问 /zh/auth-test 应该重定向到 /zh/login</li>
                    <li>• 访问 /en/auth-test 应该重定向到 /en/login</li>
                    <li>• 登录后应该返回原页面</li>
                    <li>• 认证状态在两种语言下都应该正常工作</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="/subscription"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mr-4"
                  >
                    订阅管理
                  </a>
                  <a
                    href="/protected-test"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    其他测试页面
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServerAuthGuard>
  );
}
