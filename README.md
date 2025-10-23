# Next.js SaaS Template

A comprehensive, production-ready Next.js SaaS template with internationalization, authentication, payments, and documentation capabilities. Get started quickly with a complete SaaS application foundation.

## ✨ Features

- **🌍 Internationalization** - Multi-language support with next-intl
- **🔐 OAuth Authentication** - Secure login with Auth.js (NextAuth)
- **📚 Documentation** - Built-in docs with Nextra
- **💳 Payment Integration** - Stripe payment processing
- **🌙 Dark Theme** - Tailwind CSS with dark mode support
- **📱 Responsive Design** - Mobile-first approach
- **🔍 Search** - Built-in search functionality with Pagefind
- **📄 Static Generation** - Optimized for performance

## 🚀 Quick Start

### Using the Template

Create a new project with this template:

```bash
npx next-saas-template@latest my-saas-app
cd my-saas-app
npm install
npm run dev
```

### Manual Installation

If you prefer to clone the repository:

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5
- **Internationalization**: next-intl
- **Payments**: Stripe
- **Documentation**: Nextra
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── example/          # Example implementations
├── library/              # Shared utilities
│   ├── auth/            # Authentication logic
│   ├── i18n/            # Internationalization
│   └── stripe/          # Payment integration
├── content/             # MDX content files
└── public/              # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run postbuild` - Generate static snapshots and search index

## 🌍 Internationalization

The app supports multiple languages with automatic locale detection:

- English (`/en/`)
- Chinese (`/zh/`)

Add new languages by extending the configuration in `library/i18n/`.

## 🔐 Authentication

Protected routes are automatically handled by middleware. Key features:

- OAuth providers integration
- Server-side authentication guards
- Multi-language login redirects
- Session management

See `AUTHENTICATION_SETUP.md` for detailed setup instructions.

## 💳 Payment Integration

Stripe integration includes:

- Subscription management
- Webhook handling
- Payment success/failure flows
- Multi-language support

## 📚 Documentation

Built-in documentation system with:

- MDX support
- Search functionality
- Multi-language content
- Static generation

## 🎨 UI Components

Based on shadcn/ui with additional components:

- Form components with validation
- Theme toggle
- Authentication forms
- Payment components

## 🎯 What's Included

This template provides a complete SaaS application foundation with:

- **Authentication System** - Ready-to-use login/signup flows
- **Payment Integration** - Stripe subscription management
- **Multi-language Support** - Built-in i18n with English and Chinese
- **Documentation System** - MDX-based docs with search
- **UI Components** - Pre-built components for common SaaS features
- **API Routes** - Authentication and subscription management endpoints
- **Middleware** - Route protection and language detection
- **Static Generation** - Optimized for performance and SEO

## 🔧 Recommended Additions

For enhanced functionality, consider adding:

### UI Components
- [Login UI - shadcn/ui](https://ui.shadcn.com/blocks/login)
  ```bash
  npx shadcn@latest add login-01
  ```
- [Signup UI - shadcn/ui](https://ui.shadcn.com/blocks/signup)
  ```bash
  npx shadcn@latest add signup-01
  ```
- [Image Crop - kibo-ui](https://www.kibo-ui.com/components/image-crop#circular-crop)
  ```bash
  npx shadcn add @kibo-ui/image-crop
  ```
- [Drag & Drop - dnd-kit](https://docs.dndkit.com/presets/sortable)
- [Rich Text Editor - tiptap](https://github.com/Aslam97/minimal-tiptap)
  ```bash
  npx shadcn@latest add https://raw.githubusercontent.com/Aslam97/shadcn-minimal-tiptap/main/registry/block-registry.json
  ```
- [AI UI Components - AISDK](https://ai-sdk.dev/elements/overview)
  ```bash
  npx ai-elements@latest
  ```

### Backend Services (BaaS)
- [Database - Supabase](https://supabase.com/)
- [Database - Cloudflare D1](https://dash.cloudflare.com/)
- [Database - Neon](https://neon.com/pricing)
- [Database - MongoDB](https://www.mongodb.com/)
- [Database - Firebase](https://firebase.google.com/)
- [Database - Nhost](https://nhost.io/)

### ORM
- [Prisma](https://www.prisma.io/)

## 🚀 Deploy to Production

This template is ready for deployment to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

Make sure to set up your environment variables in your deployment platform.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository.

## ⭐ Star This Template

If this template helps you build your SaaS faster, please give it a star! ⭐
