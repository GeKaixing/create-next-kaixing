# 路由权限认证设置 (与 next-intl 集成)

## 🛡️ 已实现的认证保护功能

### 🌍 多语言支持
- 与 `next-intl/middleware` 完美集成
- 支持多语言路径保护 (`/zh/subscription`, `/en/subscription`)
- 自动语言检测和重定向
- 保持用户语言偏好的登录重定向

### 1. 中间件保护 (middleware.ts)
- 自动拦截对受保护路径的访问
- 未登录用户自动重定向到登录页面
- 支持回调URL，登录后返回原页面

### 2. 受保护的页面
- `/subscription` - 订阅管理页面 (支持 `/zh/subscription`, `/en/subscription`)
- `/success` - 支付成功页面 (支持 `/zh/success`, `/en/success`)
- `/protected-test` - 测试页面
- `/auth-test` - 多语言认证测试页面

### 3. 服务端认证保护组件 (ServerAuthGuard.tsx)
- 在服务端检查用户认证状态
- 未认证用户自动重定向到登录页面
- 支持自定义重定向路径

### 4. API路由保护
- `/api/subscription` - 获取订阅信息
- `/api/subscription/cancel` - 取消订阅
- `/api/subscription/reactivate` - 恢复订阅

所有API端点都检查用户认证状态，未认证用户返回401错误。

## 🔧 使用方法

### 保护新页面
```tsx
import ServerAuthGuard from '@/components/ServerAuthGuard';

export default function ProtectedPage() {
  return (
    <ServerAuthGuard>
      <div>受保护的内容</div>
    </ServerAuthGuard>
  );
}
```

### 添加新的受保护路径
在 `middleware.ts` 中添加路径：
```typescript
const protectedPaths = ['/subscription', '/success', '/your-new-path'];
```

### 保护API路由
```typescript
import { auth } from '@/library/auth/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // 处理认证后的逻辑
}
```

## 🚀 测试方法

### 单语言测试
1. 访问 `/subscription` 或 `/success` 页面
2. 如果未登录，会自动重定向到 `/login`
3. 登录后会自动返回原页面

### 多语言测试
1. 访问 `/zh/subscription` - 应该重定向到 `/zh/login`
2. 访问 `/en/subscription` - 应该重定向到 `/en/login`
3. 访问 `/zh/auth-test` - 测试中文环境下的认证
4. 访问 `/en/auth-test` - 测试英文环境下的认证
5. 登录后应该返回对应语言的原始页面

## 📝 注意事项

- 所有受保护的页面都使用 `ServerAuthGuard` 组件
- API路由在服务端检查认证状态
- 中间件提供第一层保护
- 支持多语言路径保护
