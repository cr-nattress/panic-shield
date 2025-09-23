# Web Application Development Guidelines
## Optimized for LLM Consumption

### Table of Contents
1. [Project Structure](#project-structure)
2. [Architecture Patterns](#architecture-patterns)
3. [Component Design](#component-design)
4. [State Management](#state-management)
5. [Data Layer](#data-layer)
6. [Security & Privacy](#security--privacy)
7. [Performance Optimization](#performance-optimization)
8. [Testing Strategy](#testing-strategy)
9. [Build & Deployment](#build--deployment)
10. [Documentation Standards](#documentation-standards)

---

## Project Structure

### Directory Organization
```
project-root/
├── app/                    # Next.js app router / Vue pages / Angular modules
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main entry point
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── [feature]/        # Feature-specific components
│   │   ├── Component.tsx  # Component implementation
│   │   ├── Component.module.css # Component styles
│   │   └── index.ts      # Public exports
│   └── shared/           # Shared/common components
├── contexts/             # React Context / Vue Composition API stores
│   └── StoreContext.tsx  # Global state management
├── hooks/                # Custom hooks / composables
│   └── useFeature.ts    # Feature-specific hooks
├── utils/                # Utility functions
│   ├── storage/         # Storage utilities
│   ├── validation/      # Validators
│   └── calculations/    # Business logic
├── styles/              # Global styles and themes
├── public/              # Static assets
├── tests/               # Test files
└── types/               # TypeScript type definitions

```

### File Naming Conventions
- **Components**: PascalCase (e.g., `EmotionWheel.tsx`)
- **Hooks/Composables**: camelCase with prefix (e.g., `useStorage.ts`)
- **Utils**: camelCase (e.g., `emotionData.ts`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `EMOTION_CORES`)
- **CSS Modules**: Component.module.css
- **Test files**: Component.test.tsx or Component.spec.ts

---

## Architecture Patterns

### Layered Architecture
```typescript
// 1. Presentation Layer (Components/Pages)
interface ComponentProps {
  onAction: (data: any) => void;
  data: DisplayData;
}

// 2. Business Logic Layer (Hooks/Services)
const useBusinessLogic = () => {
  const processData = (raw: RawData): ProcessedData => {
    // Business rules here
  };
  return { processData };
};

// 3. Data Access Layer (Storage/API)
class DataService {
  async fetch(): Promise<Data> { }
  async save(data: Data): Promise<void> { }
}
```

### Component Architecture
```typescript
// Feature-based component structure
components/
├── emotion-wheel/
│   ├── EmotionWheel.tsx        # Main component
│   ├── WheelSegment.tsx        # Sub-component
│   ├── IntensitySelector.tsx   # Sub-component
│   ├── hooks/
│   │   └── useWheelState.ts    # Component-specific hook
│   ├── utils/
│   │   └── wheelGeometry.ts    # Component utilities
│   └── index.ts                 # Public API
```

### Separation of Concerns
- **View Logic**: Keep in components
- **Business Logic**: Extract to hooks/services
- **Data Management**: Separate storage layer
- **Side Effects**: Isolate in dedicated hooks/services

---

## Component Design

### Component Principles
```typescript
// 1. Single Responsibility
export const Button = ({ onClick, children, variant }) => {
  // Only handles button rendering and click
};

// 2. Composition over Inheritance
export const IconButton = ({ icon, ...buttonProps }) => (
  <Button {...buttonProps}>
    <Icon name={icon} />
  </Button>
);

// 3. Props Interface Design
interface ComponentProps {
  // Required props first
  data: DataType;
  onAction: (value: any) => void;

  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// 4. Default Props Pattern
const Component = ({
  variant = 'primary',
  size = 'md',
  ...props
}: ComponentProps) => { };
```

### Accessibility Standards
```typescript
// ARIA attributes and semantic HTML
<button
  role="button"
  aria-label="Save emotion"
  aria-pressed={isActive}
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  {children}
</button>
```

### Responsive Design
```css
/* Mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Touch-friendly targets */
.button {
  min-height: 44px; /* iOS standard */
  min-width: 44px;
}
```

---

## State Management

### Local State Pattern
```typescript
// Component-level state
const [localState, setLocalState] = useState(initialValue);

// Derived state
const derivedValue = useMemo(
  () => expensiveComputation(localState),
  [localState]
);
```

### Global State Pattern
```typescript
// Context API Pattern
const StoreContext = createContext<StoreType | undefined>(undefined);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({ state, dispatch }),
    [state]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook for consuming context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be within StoreProvider');
  }
  return context;
};
```

### State Management Best Practices
1. **Minimize state**: Only store what you can't derive
2. **Colocate state**: Keep state close to where it's used
3. **Lift state strategically**: Only when multiple components need it
4. **Normalize data**: Avoid nested data structures
5. **Use proper keys**: For lists and dynamic content

---

## Data Layer

### Storage Strategy
```typescript
// Abstracted storage interface
interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Implementation with encryption
class SecureStorage implements StorageAdapter {
  private encrypt(data: any): string {
    // AES encryption
  }

  private decrypt(encrypted: string): any {
    // AES decryption
  }

  async set<T>(key: string, value: T): Promise<void> {
    const encrypted = this.encrypt(value);
    await storage.setItem(key, encrypted);
  }
}
```

### Data Validation
```typescript
// Input validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Schema validation
interface ValidationSchema {
  [field: string]: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
  };
}

const validate = (data: any, schema: ValidationSchema): ValidationResult => {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !data[field]) {
      errors[field] = `${field} is required`;
    }
    // Additional validation rules...
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
```

### API Integration
```typescript
// Service layer pattern
class ApiService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL;

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
}
```

---

## Security & Privacy

### Security Checklist
```typescript
// 1. Input Sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};

// 2. XSS Prevention
const escapeHtml = (text: string): string => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

// 3. HTTPS Enforcement
if (location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
  location.protocol = 'https:';
}

// 4. Content Security Policy
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline';"
/>

// 5. Sensitive Data Handling
class SecureDataHandler {
  // Never log sensitive data
  private sanitizeLogs(data: any): any {
    const { password, ssn, creditCard, ...safe } = data;
    return safe;
  }

  // Clear sensitive data from memory
  clearSensitiveData(): void {
    this.sensitiveData = null;
    if (global.gc) global.gc(); // Force garbage collection if available
  }
}
```

### Privacy Patterns
```typescript
// Local-first architecture
const useLocalStorage = () => {
  // All data stays on device by default
};

// Opt-in cloud sync
const enableCloudSync = async (userConsent: boolean) => {
  if (!userConsent) return;

  // Only sync after explicit consent
  await syncService.enable();
};

// Data minimization
interface UserProfile {
  // Only collect essential data
  id: string;
  preferences: UserPreferences;
  // Avoid: email, phone, location unless necessary
}
```

---

## Performance Optimization

### Code Splitting
```typescript
// Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Route-based splitting (Next.js)
const pages = {
  '/dashboard': () => import('./pages/Dashboard'),
  '/settings': () => import('./pages/Settings'),
};
```

### Optimization Techniques
```typescript
// 1. Memoization
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

const expensiveValue = useMemo(
  () => computeExpensiveValue(dep1, dep2),
  [dep1, dep2]
);

// 2. Debouncing
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// 3. Virtual Scrolling
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index]}</div>
    )}
  </FixedSizeList>
);

// 4. Image Optimization
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Bundle Size Optimization
```javascript
// webpack.config.js / next.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
      },
    },
  },
  // Tree shaking
  sideEffects: false,
};
```

---

## Testing Strategy

### Unit Testing
```typescript
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Hook testing
import { renderHook, act } from '@testing-library/react-hooks';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### Integration Testing
```typescript
// API integration tests
describe('UserService', () => {
  it('should fetch user data', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    const user = await userService.getUser(1);
    expect(user).toEqual(mockUser);
  });
});
```

### E2E Testing
```typescript
// Playwright/Cypress example
describe('User Flow', () => {
  it('should complete emotion logging', async () => {
    await page.goto('/');
    await page.click('[data-testid="emotion-wheel"]');
    await page.click('[data-testid="emotion-happy"]');
    await page.fill('[data-testid="notes"]', 'Feeling good');
    await page.click('[data-testid="submit"]');

    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

### Testing Best Practices
1. **Test behavior, not implementation**
2. **Use data-testid for E2E selectors**
3. **Mock external dependencies**
4. **Test edge cases and error states**
5. **Maintain test coverage above 80%**

---

## Build & Deployment

### Build Configuration
```javascript
// Environment configuration
const config = {
  development: {
    API_URL: 'http://localhost:3001',
    DEBUG: true,
  },
  staging: {
    API_URL: 'https://staging-api.example.com',
    DEBUG: true,
  },
  production: {
    API_URL: 'https://api.example.com',
    DEBUG: false,
  },
};

// Build scripts in package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build"
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy
```

### Progressive Web App Configuration
```json
// manifest.json
{
  "name": "App Name",
  "short_name": "App",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Performance Monitoring
```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (metric: any) => {
  // Send to analytics
  analytics.track('Web Vitals', {
    name: metric.name,
    value: metric.value,
  });
};

getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

---

## Documentation Standards

### Code Documentation
```typescript
/**
 * Processes emotion data and returns formatted result
 * @param emotionId - Unique identifier for the emotion
 * @param intensity - Emotion intensity (1-5 scale)
 * @returns Formatted emotion object with metadata
 * @throws {ValidationError} If emotionId is invalid
 * @example
 * const emotion = processEmotion('happy', 4);
 * // Returns: { id: 'happy', intensity: 4, timestamp: Date.now() }
 */
export const processEmotion = (
  emotionId: string,
  intensity: number
): ProcessedEmotion => {
  // Implementation
};
```

### Component Documentation
```typescript
/**
 * EmotionWheel - Interactive emotion selection component
 *
 * @component
 * @example
 * <EmotionWheel
 *   onSelect={(emotion) => console.log(emotion)}
 *   defaultEmotion="neutral"
 * />
 */
interface EmotionWheelProps {
  /** Callback fired when emotion is selected */
  onSelect: (emotion: Emotion) => void;
  /** Default selected emotion */
  defaultEmotion?: string;
  /** Disable user interaction */
  disabled?: boolean;
}
```

### README Template
```markdown
# Project Name

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Architecture Overview
- **Framework**: Next.js/Vue/Angular
- **State Management**: Context API/Vuex/NgRx
- **Styling**: CSS Modules/Tailwind
- **Testing**: Jest/Testing Library

## Project Structure
[See detailed structure above]

## Key Features
- Feature 1: Description
- Feature 2: Description

## Development Workflow
1. Create feature branch
2. Implement feature
3. Write tests
4. Run linting
5. Create PR

## Deployment
[Deployment instructions]

## Contributing
[Contributing guidelines]
```

---

## Framework-Specific Guidelines

### Next.js Specific
```typescript
// App Router patterns
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
└── api/
    └── users/route.ts

// Server Components
export default async function Page() {
  const data = await fetchData(); // Direct data fetching
  return <Client data={data} />;
}

// Route Handlers
export async function GET(request: Request) {
  return NextResponse.json({ data });
}
```

### Vue 3 Specific
```typescript
// Composition API patterns
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

watch(count, (newVal, oldVal) => {
  console.log(\`Count changed: \${oldVal} -> \${newVal}\`);
});
</script>

// Composables
export const useCounter = () => {
  const count = ref(0);
  const increment = () => count.value++;

  return { count, increment };
};
```

### Angular Specific
```typescript
// Service pattern
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data');
  }
}

// Component with OnPush
@Component({
  selector: 'app-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component {
  constructor(private dataService: DataService) {}
}
```

---

## Error Handling Patterns

### Global Error Boundary
```typescript
// React Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### Async Error Handling
```typescript
// Try-catch pattern with proper types
const fetchData = async (): Promise<Result<Data, Error>> => {
  try {
    const response = await api.getData();
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

// Error recovery hook
const useErrorRecovery = () => {
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setRetryCount(prev => prev + 1);
  }, []);

  return { error, retry, retryCount };
};
```

---

## Monitoring & Analytics

### Analytics Integration
```typescript
// Analytics service abstraction
interface AnalyticsService {
  track(event: string, properties?: Record<string, any>): void;
  identify(userId: string, traits?: Record<string, any>): void;
  page(name: string, properties?: Record<string, any>): void;
}

class Analytics implements AnalyticsService {
  track(event: string, properties?: Record<string, any>) {
    // Send to multiple providers
    if (window.gtag) {
      window.gtag('event', event, properties);
    }
    if (window.mixpanel) {
      window.mixpanel.track(event, properties);
    }
  }
}
```

### Error Tracking
```typescript
// Sentry integration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  },
});
```

---

## Best Practices Summary

### DO's
- ✅ Use TypeScript for type safety
- ✅ Write tests for critical paths
- ✅ Implement proper error boundaries
- ✅ Follow accessibility guidelines
- ✅ Use semantic HTML
- ✅ Implement proper loading states
- ✅ Cache expensive computations
- ✅ Validate all user inputs
- ✅ Use environment variables for configuration
- ✅ Implement proper logging

### DON'Ts
- ❌ Store sensitive data in localStorage
- ❌ Mutate state directly
- ❌ Use any type without justification
- ❌ Ignore console errors/warnings
- ❌ Skip error handling
- ❌ Use inline styles extensively
- ❌ Hardcode configuration values
- ❌ Mix business logic with UI
- ❌ Ignore performance metrics
- ❌ Ship without testing

---

## Quick Reference Checklist

### Before Starting Development
- [ ] Set up TypeScript configuration
- [ ] Configure linting and formatting
- [ ] Set up testing framework
- [ ] Create folder structure
- [ ] Define coding standards

### During Development
- [ ] Write meaningful commit messages
- [ ] Create feature branches
- [ ] Write tests alongside code
- [ ] Document complex logic
- [ ] Review accessibility

### Before Deployment
- [ ] Run all tests
- [ ] Check bundle size
- [ ] Validate SEO meta tags
- [ ] Test on multiple devices
- [ ] Review security checklist
- [ ] Check performance metrics
- [ ] Update documentation

---

## Resources & Tools

### Essential Tools
- **Bundler**: Vite, Webpack, Turbopack
- **Testing**: Jest, Testing Library, Playwright
- **Linting**: ESLint, Prettier
- **Type Checking**: TypeScript
- **State Management**: Zustand, Redux Toolkit, Pinia
- **Styling**: Tailwind CSS, CSS Modules, Styled Components
- **Monitoring**: Sentry, DataDog, New Relic
- **Analytics**: Google Analytics, Mixpanel, Amplitude

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [React Documentation](https://react.dev/)
- [Vue Documentation](https://vuejs.org/)
- [Angular Documentation](https://angular.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

*This document serves as a comprehensive guide for web application development. Adapt these guidelines to your specific project needs while maintaining the core principles of clean, secure, and performant code.*