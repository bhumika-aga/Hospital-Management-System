# 🌐 HealthSync Portal - Frontend Application

The **HealthSync Portal** is a modern React application that serves as the frontend for the HealthSync Hospital Management System. Built with Apple & Vercel-inspired design principles, it provides an intuitive interface for managing patient treatments, insurance claims, and specialist assignments.

## ✨ Features

### Core Functionality

- **🔐 Authentication & User Management** - Secure JWT-based login with user creation flow
- **👨‍⚕️ Treatment Management** - Browse treatment packages and specialist assignment
- **📋 Treatment Plans** - Generate and manage patient treatment timetables with timeline views
- **💰 Insurance Claims** - Comprehensive claims processing with receipt generation
- **📊 Dashboard** - Real-time system overview with intelligent navigation

### Advanced Features

- **🌙 Dark/Light Theme** - Seamless theme switching with persistent settings
- **👤 Profile Management** - Complete user profile editing and account management
- **⚙️ Settings & Preferences** - Comprehensive settings with data export/import
- **📞 Integrated Communication** - Email, phone, and documentation access
- **📄 Receipt Generation** - Professional HTML receipt downloads for claims
- **🎨 Modern UI/UX** - Apple-inspired design with enhanced accessibility

## 🛠️ Technology Stack

- **React 19** with TypeScript for robust development
- **Material-UI v7** with custom theming
- **React Router v6** for client-side routing
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Yup validation
- **Axios** for API communication with interceptors
- **Custom Theme System** implementing Apple & Vercel design patterns

## 🏗️ Project Structure

```text
member-portal/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   └── layout/           # Layout components (Header, Sidebar)
│   ├── pages/                # Application pages
│   │   ├── Dashboard.tsx     # System overview dashboard
│   │   ├── Login.tsx         # Authentication & user creation
│   │   ├── Profile.tsx       # User profile management
│   │   ├── Settings.tsx      # Application settings & preferences
│   │   ├── TreatmentPackages.tsx  # Treatment packages listing
│   │   ├── Specialists.tsx   # Specialists management
│   │   ├── Treatments.tsx    # Treatment planning & timeline
│   │   ├── Claims.tsx        # Insurance claims with receipt generation
│   │   └── Help.tsx          # Support & documentation
│   ├── services/             # API service layer
│   │   ├── api.ts           # Base API configuration
│   │   ├── auth.service.ts   # Authentication services
│   │   ├── treatment.service.ts # Treatment-related APIs
│   │   └── insurance.service.ts # Insurance claim APIs
│   ├── theme/                # Material-UI theme configuration
│   │   └── theme.ts         # Custom theme with Apple/Vercel styling
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts         # Shared interfaces and types
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── package.json             # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm or yarn**
- **Backend server** running at `http://localhost:8080`

### Installation & Setup

1. **Install dependencies:**

```bash
cd member-portal
npm install
```

2.**Configure API endpoint:**

Create `.env.local` file (optional):

```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```

3.**Start development server:**

```bash
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

- **`npm start`** - Start development server with hot reload
- **`npm test`** - Run test suite with Jest & React Testing Library
- **`npm run build`** - Create optimized production build
- **`npm run eject`** - Eject from Create React App (irreversible)

## 🎨 Design System

### Apple-Inspired Aesthetics

- **Clean Typography** - Inter font with perfect hierarchy
- **Subtle Shadows** - Soft elevation effects
- **Minimal Color Palette** - Focus on content over decoration
- **Generous Whitespace** - Breathing room for better UX

### Vercel-Style Interactions

- **Smooth Animations** - 200ms transitions for all interactions
- **Hover Effects** - Subtle scale and shadow changes
- **Loading States** - Skeleton screens and progress indicators
- **Micro-interactions** - Button press feedback and form validation

### Responsive Design

- **Mobile-First** - Designed for smallest screens first
- **Breakpoint System** - Material-UI responsive breakpoints
- **Flexible Layouts** - Grid and flex-based components
- **Touch-Friendly** - 44px minimum touch targets

## 🔗 API Integration

### Backend Connection

The frontend connects to the monolithic backend at `http://localhost:8080` with the following endpoints:

- **Authentication:** `POST /auth/generate-token`
- **Treatment Packages:** `GET /IPTreatmentPackages`
- **Specialists:** `GET /specialists`
- **Treatment Plans:** `POST /IPTreatment/generateTimetable`
- **Insurance Claims:** `POST /insurance/InitiateClaim`

### API Service Layer

```typescript
// services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  auth: {
    base: `${API_BASE_URL}`,
    generateToken: '/auth/generate-token',
  },
  treatment: {
    packages: '/IPTreatmentPackages',
    specialists: '/specialists',
    generateTimetable: '/IPTreatment/generateTimetable',
  },
  insurance: {
    initiateClaim: '/insurance/InitiateClaim',
    insurers: '/insurance/GetAllInsurerDetail',
    claims: '/insurance/claims',
  },
};
```

### Authentication Flow

1. **Login:** User enters username → JWT token generated
2. **Token Storage:** Token saved in localStorage
3. **API Requests:** Token sent in Authorization header
4. **Auto-Refresh:** Token checked and renewed as needed
5. **Logout:** Token removed and user redirected

## 🧪 Testing

### Test Suite

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test Dashboard.test.tsx
```

### Testing Stack

- **Jest** - Test runner and assertions
- **React Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking for tests
- **User Event** - Realistic user interaction testing

## 🔧 Configuration

### Environment Variables

- `REACT_APP_API_BASE_URL` - Backend server URL (default: <http://localhost:8080>)
- `REACT_APP_VERSION` - Application version for display

### Build Configuration

Production build optimizations:

- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Remove unused code
- **Bundle Analysis** - Use `npm run analyze` to inspect bundle
- **Service Worker** - Caching for offline functionality

## 🚀 Deployment

### Local Build

```bash
npm run build
npx serve -s build
```

### Cloud Deployment (Render)

```yaml
# render.yaml
services:
  - type: web
    name: healthsync-portal
    env: node
    buildCommand: npm ci && npm run build
    startCommand: npm start
    envVars:
      - key: REACT_APP_API_BASE_URL
        value: https://your-backend.render.com
```

### Environment-Specific Builds

- **Development:** Hot reload, source maps, verbose logging
- **Production:** Minified, optimized, error boundaries
- **Testing:** Mock API responses, test utilities enabled

## 🎯 User Journey

### 1. Authentication

- Landing page with clean login form
- JWT token generation and storage
- Automatic redirect to dashboard

### 2. Dashboard Overview

- System statistics and health metrics
- Quick navigation to main features
- Real-time data updates

### 3. Profile & Settings Management

- Edit personal information and account details
- Change password and security settings
- Toggle dark/light theme with immediate effect
- Configure notification preferences (Email, SMS, Sound)
- Select language from multiple Indian languages
- Export/import personal data for backup

### 4. Treatment Management

- Browse available treatment packages with detailed information
- Select packages directly from the packages view
- View specialist details with contact capabilities
- Generate patient treatment plans with timeline visualization
- Update treatment status and view progress
- Seamless navigation between package selection and treatment creation

### 5. Insurance Processing

- Initiate new insurance claims with treatment package selection
- Auto-populate treatment costs based on selected packages
- Select appropriate insurance providers with coverage details
- Track claim status and progress with detailed views
- Download professional HTML receipts for claims
- View comprehensive claim details in modal dialogs

### 6. Communication & Support

- Send support emails with pre-filled templates
- Make phone calls directly from the interface
- View comprehensive documentation in new browser tabs
- Access help resources and FAQ sections

### 7. Navigation

- Collapsible sidebar with smooth animations
- Responsive header with theme toggle
- Mobile-responsive hamburger menu
- Profile dropdown with quick access to settings

## 🔍 Performance Optimization

- **React.memo** - Prevent unnecessary re-renders
- **useCallback/useMemo** - Optimize expensive computations
- **Code Splitting** - Load components on demand
- **Image Optimization** - WebP format with fallbacks
- **Bundle Size** - Keep under 300KB gzipped

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify backend server is running on port 8080
   - Check CORS configuration in backend
   - Confirm API_BASE_URL environment variable

2. **Authentication Issues**
   - Clear localStorage and login again
   - Verify JWT token in browser dev tools
   - Check token expiry (30 minutes default)

3. **Build Failures**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility (18+)
   - Verify TypeScript compilation errors

### Development Tools

- **React DevTools** - Component tree inspection
- **Redux DevTools** - State management debugging (if using Redux)
- **Network Tab** - API request/response monitoring
- **Console Logging** - Debug mode with detailed logs

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new components and features
3. Update TypeScript types for new API changes
4. Test responsiveness on multiple device sizes
5. Ensure accessibility compliance (WCAG 2.1)

## 📱 Browser Support

- **Chrome 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**
- **Mobile Safari iOS 14+**
- **Chrome Mobile Android 90+**

---

Built with ❤️ using modern React best practices and Apple-inspired design principles.
