import { redirect } from 'next/navigation'
import { auth } from '@/library/auth/auth'
import { stripe } from '@/library/stripe/stripe'
import ServerAuthGuard from '@/components/example/ServerAuthGuard'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <ServerAuthGuard>
        <section id="success" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  支付成功！
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  感谢您的购买！确认邮件已发送至{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{customerEmail}</span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  如有任何问题，请联系{' '}
                  <a href="mailto:orders@example.com" className="text-blue-600 hover:text-blue-500">
                    orders@example.com
                  </a>
                </p>
                <div className="mt-8">
                  <a
                    href="/subscription"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    管理订阅
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ServerAuthGuard>
    )
  }
}