/**
 * @description: subscription manager component
 * @returns {React.ReactNode} subscription manager component
 */
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface SubscriptionData {
  id: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: {
    name: string;
    amount: number;
    currency: string;
  };
}

export default function SubscriptionManager() {
  const t = useTranslations("subscription");
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      } else {
        setMessage(t("noSubscription"));
      }
    } catch (error) {
      setMessage(t("errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    setCancelling(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });

      if (response.ok) {
        setMessage(t("cancellationScheduled"));
        // 重新获取订阅信息
        await fetchSubscription();
      } else {
        const error = await response.json();
        setMessage(error.message || t("cancellationFailed"));
      }
    } catch (error) {
      setMessage(t("cancellationFailed"));
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
        <a 
          href="/" 
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("subscribeNow")}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 订阅状态卡片 */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("currentPlan")}
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {subscription.status === 'active' ? t("active") : t("inactive")}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("planName")}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {subscription.plan.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("price")}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ¥{subscription.plan.amount / 100} / {t("month")}
            </p>
          </div>
        </div>
      </div>

      {/* 续费信息 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {subscription.cancel_at_period_end ? t("cancellationInfo") : t("renewalInfo")}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {subscription.cancel_at_period_end 
            ? t("willExpireOn", { date: formatDate(subscription.current_period_end) })
            : t("nextBillingDate", { date: formatDate(subscription.current_period_end) })
          }
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {!subscription.cancel_at_period_end && (
          <button
            onClick={handleCancelSubscription}
            disabled={cancelling}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cancelling ? t("cancelling") : t("cancelAtPeriodEnd")}
          </button>
        )}
        
        {subscription.cancel_at_period_end && (
          <button
            onClick={async () => {
              // 恢复订阅的逻辑
              const response = await fetch('/api/subscription/reactivate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscriptionId: subscription.id }),
              });
              
              if (response.ok) {
                setMessage(t("reactivationSuccess"));
                await fetchSubscription();
              } else {
                setMessage(t("reactivationFailed"));
              }
            }}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t("reactivateSubscription")}
          </button>
        )}
      </div>

      {/* 消息显示 */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('成功') || message.includes('已安排') 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
