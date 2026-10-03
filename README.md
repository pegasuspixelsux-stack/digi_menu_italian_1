# digi_menu

A modern, Apple-designed digital menu management platform built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Apple-inspired minimalism with generous whitespace and refined typography
- **Responsive Layout**: Mobile-first design with optimized grid layouts (1-column mobile, 2-column desktop)
- **Authentication**: Secure admin login with protected dashboard
- **Menu Management**: Add, edit, and delete menu items with image previews
- **Smooth Animations**: Fluid interactions powered by Framer Motion
- **Dark Mode Support**: Built-in dark mode with smooth transitions
- **Production Ready**: TypeScript, ESLint, and best practices throughout

## Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
\\\ash
cd digi_menu
\\\

2. Install dependencies:
\\\ash
npm install
\\\

3. Start the development server:
\\\ash
npm run dev
\\\

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Credentials

For testing the admin dashboard:
- **Email**: admin@digi-menu.com
- **Password**: admin123

## Project Structure

\\\
digi_menu/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with auth provider
│   ├── page.tsx                 # Home page (menu display)
│   ├── login/                   # Authentication pages
│   │   └── page.tsx
│   └── dashboard/               # Admin dashboard
│       └── page.tsx
├── components/                  # React components
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── menu/
│   │   ├── MenuItemCard.tsx
│   │   └── MenuGrid.tsx
│   └── dashboard/
│       └── MenuItemForm.tsx
├── lib/                         # Utilities and context
│   ├── types/
│   │   └── index.ts
│   ├── auth-context.tsx         # Authentication context
│   ├── store.ts                 # In-memory data store
├── styles/
│   └── globals.css              # Global styles and Tailwind
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
\\\

## Key Features Explained

### Authentication
- Context-based auth state management
- Protected dashboard routes
- Secure logout functionality

### Menu Management
- Add new menu items with image URLs
- Edit existing items inline
- Delete items with confirmation
- Category and availability tracking
- Real-time image previews

### Design System
- Custom Tailwind theme with semantic colors
- System font stack for best legibility
- Refined spacing and typography scales
- Accessible color contrasts
- Smooth transitions and interactions

### Animations
- Framer Motion integration
- Staggered list animations
- Smooth page transitions
- Gesture-aware interactions
- Reduced motion support

## Styling

The project uses Tailwind CSS with a custom theme:

- **Colors**: Semantic color tokens (surface, text, accent, etc.)
- **Typography**: System fonts with Apple-inspired hierarchy
- **Spacing**: 4px-based scale with safe area insets
- **Shadows**: Subtle and elevated shadow options
- **Dark Mode**: Full dark mode support with CSS variables

## Performance

- Optimized images with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy-loaded animations with Framer Motion
- Hardware-accelerated transforms
- Reduced motion support for accessibility

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- High contrast mode support
- Reduced motion preferences respected
- Focus states on interactive elements

## Building for Production

1. Create an optimized build:
\\\ash
npm run build
\\\

2. Start the production server:
\\\ash
npm run start
\\\

## Future Enhancements

- [ ] Database integration (Supabase/Firebase)
- [ ] Real user authentication
- [ ] Image upload instead of URL
- [ ] Order management system
- [ ] Customer reviews and ratings
- [ ] Export menu to PDF
- [ ] Menu analytics dashboard
- [ ] Multi-restaurant support

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Language**: TypeScript 5
- **Linting**: ESLint

## License

MIT License - feel free to use this project for your own purposes.

## Support

For questions or issues, please create an issue in the repository.

---

Built with ❤️ using modern web technologies and Apple design principles.
