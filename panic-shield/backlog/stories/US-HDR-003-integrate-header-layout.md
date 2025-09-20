# User Story: Integrate Header into Layout

**Story ID**: US-HDR-003
**Epic**: EP-008-Application-Header
**Priority**: P0 (Critical)
**Points**: 5
**Status**: Ready

## Description

As a user, I want the new header to be integrated into all pages so that I have consistent navigation and access to features throughout the app.

## Acceptance Criteria

### Functional Requirements
- [ ] Header appears on all main pages (Home, Log, Trends, Achievements)
- [ ] Header subtitle changes based on current page
- [ ] Menu drawer state managed globally
- [ ] Theme toggle works from header
- [ ] Settings accessible from header
- [ ] Page content adjusted for header height
- [ ] Back buttons removed from individual pages
- [ ] Bottom navigation still works correctly

### Visual Requirements
- [ ] No layout shift when header loads
- [ ] Proper spacing below header (no overlap)
- [ ] Smooth transitions between pages
- [ ] Header persists during navigation
- [ ] Panic page shows minimal variant

### Technical Requirements
- [ ] Update main app layout structure
- [ ] Add UI context for drawer state
- [ ] Connect header to existing pages
- [ ] Remove redundant navigation elements
- [ ] Maintain existing functionality

## Implementation Tasks

### 1. Create UI Context
```typescript
// contexts/UIContext.tsx
interface UIContextType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  headerVariant: 'default' | 'minimal' | 'panic';
  setHeaderVariant: (variant: HeaderVariant) => void;
}

export const UIProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVariant, setHeaderVariant] = useState<HeaderVariant>('default');

  return (
    <UIContext.Provider value={{
      menuOpen,
      setMenuOpen,
      headerVariant,
      setHeaderVariant
    }}>
      {children}
    </UIContext.Provider>
  );
};
```

### 2. Update Main Layout
```tsx
// app/page.tsx
export default function EmotionWheelApp() {
  const { menuOpen, setMenuOpen, headerVariant } = useUI();

  const getPageSubtitle = (page: string) => {
    const subtitles = {
      home: 'Check In',
      log: 'Track Emotion',
      trends: 'Your Insights',
      achievements: 'Progress',
      panic: 'Crisis Support'
    };
    return subtitles[page] || '';
  };

  return (
    <UIProvider>
      <div className="app">
        <AppHeader
          subtitle={getPageSubtitle(currentPage)}
          variant={currentPage === 'panic' ? 'panic' : 'default'}
          onMenuClick={() => setMenuOpen(true)}
        />

        <MenuDrawer
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          currentPage={currentPage}
        />

        <main className="app-content">
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'log' && <LogPage onNavigate={setCurrentPage} />}
          {currentPage === 'panic' && <PanicPage onNavigate={setCurrentPage} />}
          {currentPage === 'trends' && <TrendsPage onNavigate={setCurrentPage} />}
          {currentPage === 'achievements' && <AchievementsPage onNavigate={setCurrentPage} />}
        </main>

        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </UIProvider>
  );
}
```

### 3. Update Global Styles
```css
/* app/globals.css */
.app {
  padding-top: 56px; /* Header height */
  padding-bottom: 72px; /* Bottom nav height */
}

.app-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* Remove top padding from pages */
.page {
  padding-top: 0; /* Was 16px */
}
```

### 4. Remove Back Buttons from Pages
```tsx
// components/LogPage.tsx
// Remove this:
// <button onClick={() => onNavigate('home')} className="back-btn">
//   <ChevronLeft size={24} />
// </button>

// Update header structure:
<div className="page-header">
  <h2>{pageTitle}</h2>
  {/* No back button needed */}
</div>
```

### 5. Move Theme Toggle to Header
```tsx
// Remove from HomePage.tsx:
// <ThemeToggle />

// Already included in AppHeader:
<div className="header-right">
  <ThemeToggle />
  <SettingsButton />
</div>
```

### 6. Move Settings to Header
```tsx
// Remove from HomePage.tsx:
// <button onClick={() => setSettingsOpen(true)}>
//   <Settings size={20} />
// </button>

// Add to AppHeader:
const handleSettingsClick = () => {
  setSettingsModalOpen(true);
};
```

## Test Cases

### Integration Tests
- [ ] Header appears on all pages
- [ ] Menu drawer opens from any page
- [ ] Theme toggle works globally
- [ ] Settings modal opens from header
- [ ] Navigation between pages maintains header
- [ ] Panic mode shows correct header variant

### Visual Tests
- [ ] No layout shifts
- [ ] Proper spacing on all pages
- [ ] Header stays fixed during scroll
- [ ] Transitions smooth between pages

### Regression Tests
- [ ] Bottom navigation still works
- [ ] All page features still accessible
- [ ] Settings persist correctly
- [ ] Theme changes apply everywhere
- [ ] Panic mode still accessible

## Definition of Done

- [ ] Header integrated into layout
- [ ] All pages updated
- [ ] Back buttons removed
- [ ] Theme/Settings moved to header
- [ ] UI context implemented
- [ ] No visual regressions
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated

## Dependencies

- US-HDR-001 (AppHeader component)
- US-HDR-002 (MenuDrawer component)
- Existing page components
- Theme and Settings contexts

## Notes

- Ensure no functionality is lost during migration
- Test thoroughly on all pages
- Consider feature flag for gradual rollout
- Monitor performance impact

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
feat(header): integrate header into app layout

- Add AppHeader to main layout
- Create UI context for drawer state
- Update page padding for header height
- Remove redundant back buttons
- Move theme toggle and settings to header

Fixes: US-HDR-003
```

### Pre-Commit Checklist
- [ ] All pages showing header
- [ ] Navigation working correctly
- [ ] No visual regressions
- [ ] Tests passing
- [ ] Code reviewed