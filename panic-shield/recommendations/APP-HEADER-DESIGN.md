# Application Header Design Recommendations

## Current State Analysis

### Pages/Views Inventory
1. **HomePage** - Main landing with "How are you?" heading
2. **LogPage** - Emotion logging with back button
3. **PanicPage** - Crisis intervention with back button
4. **TrendsPage** - Analytics view with back button
5. **AchievementsPage** - Gamification view with back button

### Current Navigation Pattern
- **Bottom Navigation**: Always visible tab bar with Home, Log, Panic, Trends
- **Back Buttons**: Individual pages have inconsistent back button implementations
- **Settings**: Only accessible from HomePage via icon button
- **Theme Toggle**: Only available on HomePage

### Issues with Current Approach
1. **Inconsistent Navigation**: Mix of bottom nav and back buttons
2. **Limited Access**: Settings and theme toggle only on home page
3. **No App Identity**: Missing consistent branding across pages
4. **Redundant Navigation**: Back buttons duplicate bottom nav functionality
5. **No Global Actions**: Can't access key features from all pages

## Proposed Application Header

### Design Specifications

```
┌─────────────────────────────────────────┐
│  [≡]  Emotion Tracker         [☾] [⚙]  │  <- 56px height
├─────────────────────────────────────────┤
│                                         │
│            Page Content                 │
│                                         │
├─────────────────────────────────────────┤
│  [🏠]    [✏️]    [🚨]    [📈]          │  <- Bottom Nav (72px)
└─────────────────────────────────────────┘
```

### Header Components

#### 1. Left Section
- **Menu Button** (≡): Opens slide-out drawer
  - Profile/User info
  - Quick Stats
  - Emergency Contacts
  - About/Help
  - Sign Out (if auth added)

#### 2. Center Section
- **App Name**: "Emotion Tracker" or "MoodShield"
- **Page Title**: Context-aware subtitle
  - Home: "Check In"
  - Log: "Track Emotion"
  - Panic: "Crisis Support"
  - Trends: "Your Insights"
  - Achievements: "Progress"

#### 3. Right Section
- **Theme Toggle** (☾/☀): Always accessible
- **Settings** (⚙): Quick settings access
- **Optional**: Notification bell for reminders

### Visual Design

```css
.app-header {
  height: 56px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

/* Light mode */
--header-bg: rgba(255, 255, 255, 0.95);

/* Dark mode */
--header-bg: rgba(17, 24, 39, 0.95);
```

### Behavior Rules

#### When to Show Header
1. **Always Show**:
   - All main pages (Home, Log, Trends, Achievements)
   - Settings page
   - Any future pages

2. **Hide/Modify for**:
   - Panic mode (simplified, minimal header)
   - Full-screen exercises (breathing, grounding)
   - Onboarding/splash screens
   - Modal overlays

#### Panic Mode Special Case
```
┌─────────────────────────────────────────┐
│  [X]  Crisis Support           [📞]     │  <- Simplified
├─────────────────────────────────────────┤
│                                         │
│         Panic Exercises                 │
│                                         │
└─────────────────────────────────────────┘
```
- Minimal header with close (X) and emergency call (📞)
- No distracting elements
- Higher contrast for visibility

### Implementation Approach

#### Phase 1: Create Header Component
```tsx
// components/AppHeader.tsx
interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'minimal' | 'panic';
  onMenuClick?: () => void;
  hideMenu?: boolean;
  hideSettings?: boolean;
}

export default function AppHeader({
  title = "Emotion Tracker",
  subtitle,
  variant = 'default',
  onMenuClick,
  hideMenu = false,
  hideSettings = false
}: AppHeaderProps) {
  // Implementation
}
```

#### Phase 2: Create Menu Drawer
```tsx
// components/MenuDrawer.tsx
export default function MenuDrawer({
  isOpen,
  onClose
}: MenuDrawerProps) {
  return (
    <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
      {/* User section */}
      {/* Quick stats */}
      {/* Menu items */}
      {/* Emergency contacts */}
    </div>
  );
}
```

#### Phase 3: Update Layout Structure
```tsx
// app/page.tsx
export default function EmotionWheelApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <AppHeader
        subtitle={getPageSubtitle(currentPage)}
        variant={currentPage === 'panic' ? 'panic' : 'default'}
        onMenuClick={() => setMenuOpen(true)}
      />

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="app-content">
        {/* Page content */}
      </main>

      <BottomNav />
    </div>
  );
}
```

### Menu Drawer Content

```
┌──────────────────────────┐
│  Profile                 │
│  ┌────┐                  │
│  │ 👤 │  Guest User      │
│  └────┘  2 day streak 🔥 │
├──────────────────────────┤
│  Quick Stats             │
│  📊 15 logs this week    │
│  😊 Mostly positive      │
│  📈 Improving trend      │
├──────────────────────────┤
│  Menu                    │
│  🏆 Achievements         │
│  ⚙️ Settings             │
│  📱 Reminders            │
│  ❓ Help & Support       │
│  📖 About               │
├──────────────────────────┤
│  Emergency               │
│  🆘 Crisis Hotline       │
│  👤 My Therapist         │
│  💬 Support Chat         │
└──────────────────────────┘
```

### Responsive Behavior

#### Mobile (< 480px)
- Compact header (56px)
- Hamburger menu
- Abbreviated app name if needed

#### Tablet (480px - 768px)
- Full header (64px)
- Full app name
- More spacing

#### Desktop (> 768px)
- Enhanced header (72px)
- Additional quick actions
- Breadcrumb navigation

### Animation & Transitions

```css
/* Slide-in menu drawer */
.menu-drawer {
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-drawer.open {
  transform: translateX(0);
}

/* Header scroll behavior */
.app-header {
  transition: transform 0.3s, box-shadow 0.3s;
}

.app-header.scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Hide on scroll down (optional) */
.app-header.hidden {
  transform: translateY(-100%);
}
```

### Accessibility Considerations

1. **ARIA Labels**:
   - `aria-label="Main menu"` for hamburger
   - `aria-label="Toggle theme"` for theme switch
   - `aria-label="Settings"` for settings icon

2. **Keyboard Navigation**:
   - Tab order: Menu → App Name → Theme → Settings
   - Escape key closes menu drawer
   - Focus trap in menu when open

3. **Screen Reader Announcements**:
   - Page changes announced
   - Menu state changes announced
   - Theme changes announced

### Benefits of This Approach

1. **Consistent Identity**: App name always visible
2. **Universal Access**: Settings and theme available everywhere
3. **Better Organization**: Menu drawer for secondary features
4. **Cleaner Pages**: Remove redundant back buttons
5. **Scalability**: Easy to add new global features
6. **Professional Look**: Standard mobile app pattern
7. **Emergency Access**: Crisis resources always reachable

### Implementation Priority

1. **Phase 1** (Critical):
   - Basic header component
   - Theme toggle integration
   - Settings access

2. **Phase 2** (Important):
   - Menu drawer
   - Emergency contacts section
   - Quick stats

3. **Phase 3** (Nice to have):
   - Scroll behaviors
   - Advanced animations
   - Desktop enhancements

### Migration Strategy

1. **Step 1**: Create header component without breaking changes
2. **Step 2**: Add to layout with feature flag
3. **Step 3**: Test with subset of users
4. **Step 4**: Remove page-specific headers
5. **Step 5**: Full rollout

### Example Implementation Timeline

- **Day 1**: Create AppHeader component
- **Day 2**: Create MenuDrawer component
- **Day 3**: Integrate with existing layout
- **Day 4**: Update all pages to use new header
- **Day 5**: Testing and refinements
- **Day 6**: Animation and polish
- **Day 7**: Accessibility audit and fixes

## Conclusion

This unified header approach will:
- Improve user orientation and navigation
- Provide consistent access to key features
- Strengthen app identity and branding
- Follow established mobile UX patterns
- Scale well for future features

The implementation is straightforward and can be done incrementally without disrupting the existing functionality.