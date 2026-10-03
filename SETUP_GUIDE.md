# digi_menu Setup Guide

## Quick Start

```bash
cd digi_menu
npm install
npm run dev
```

Visit: **http://localhost:3000**

## Demo Credentials

- **Email**: admin@digi-menu.com
- **Password**: admin123

## Project Structure

```
digi_menu/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Auth Provider
│   ├── page.tsx           # Home page (menu display)
│   ├── login/page.tsx     # Admin login page
│   └── dashboard/page.tsx # Admin dashboard
├── components/            # React components
│   ├── auth/LoginForm.tsx
│   ├── menu/MenuItemCard.tsx
│   ├── menu/MenuGrid.tsx
│   └── dashboard/MenuItemForm.tsx
├── lib/
│   ├── auth-context.tsx   # Auth state management
│   ├── store.ts           # In-memory data store
│   └── types/index.ts     # TypeScript definitions
├── styles/globals.css     # Global styles + Tailwind
└── [config files]
```

## Features

✅ Apple-inspired minimalist design  
✅ Dark/light mode support  
✅ Responsive grids (1-col mobile, 2-col desktop)  
✅ Admin authentication & protected routes  
✅ Menu item management (add/edit/delete)  
✅ Image URL preview  
✅ Framer Motion animations  
✅ TypeScript for type safety  
✅ Tailwind CSS styling  

## Pages

### Home Page (`/`)
- Menu display with responsive grid
- Hero section with smooth animations
- Navigation links

### Login Page (`/login`)
- Admin authentication
- Demo credentials provided
- Auto-redirect if already logged in

### Dashboard (`/dashboard`)
- Protected admin-only page
- Add new menu items
- Edit items inline
- Delete items with confirmation
- Real-time image preview

## Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: '#0066cc',  // Change primary color
  // ... other colors
}
```

### Change Typography
System fonts are configured for Apple-like appearance. Override in `tailwind.config.ts`.

### Add Database
Replace `lib/store.ts` with API calls:
1. Create `app/api/items/route.ts`
2. Replace `store.getMenuItems()` with `fetch('/api/items')`
3. Update add/edit/delete to use POST/PUT/DELETE

## Next Steps

1. **Run the app**: `npm run dev`
2. **Explore**: Visit http://localhost:3000
3. **Test dashboard**: Login with demo credentials
4. **Customize**: Edit colors, fonts, and components
5. **Deploy**: Push to GitHub and deploy with Vercel

---

Built with Next.js 15, Framer Motion, and Tailwind CSS.
