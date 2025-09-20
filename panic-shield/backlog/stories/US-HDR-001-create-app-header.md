# User Story: Create AppHeader Component

**Story ID**: US-HDR-001
**Epic**: EP-008-Application-Header
**Priority**: P0 (Critical)
**Points**: 5
**Status**: Ready

## Description

As a user, I want a consistent header across all pages so that I can always see the app name and access key functions without returning to the home page.

## Acceptance Criteria

### Functional Requirements
- [ ] Header displays app name "Emotion Tracker"
- [ ] Header shows context-aware subtitle based on current page
- [ ] Header is 56px height on mobile
- [ ] Header has left section for menu button
- [ ] Header has center section for title/subtitle
- [ ] Header has right section for theme/settings
- [ ] Header stays fixed at top while scrolling
- [ ] Header has backdrop blur effect

### Visual Requirements
- [ ] Matches design specifications in mockups
- [ ] Proper spacing and alignment
- [ ] Theme-aware colors (light/dark mode)
- [ ] Smooth transitions between states
- [ ] Elevation shadow when scrolled

### Technical Requirements
- [ ] TypeScript component with proper types
- [ ] Accepts variant prop: 'default' | 'minimal' | 'panic'
- [ ] Accepts title and subtitle props
- [ ] Emits onMenuClick event
- [ ] Uses CSS modules for styling
- [ ] Memoized for performance

## Implementation Tasks

### 1. Create Component Structure
```typescript
// components/header/AppHeader.tsx
interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'minimal' | 'panic';
  onMenuClick?: () => void;
  hideMenu?: boolean;
  hideSettings?: boolean;
}
```

### 2. Implement Layout
```tsx
<header className={`app-header ${variant}`}>
  <div className="header-left">
    {!hideMenu && <MenuButton />}
  </div>
  <div className="header-center">
    <h1>{title}</h1>
    {subtitle && <span>{subtitle}</span>}
  </div>
  <div className="header-right">
    <ThemeToggle />
    {!hideSettings && <SettingsButton />}
  </div>
</header>
```

### 3. Add Styling
```css
.app-header {
  position: sticky;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
  transition: all 0.3s ease;
}
```

### 4. Handle Variants
- Default: Full header with all elements
- Minimal: Reduced elements for focus modes
- Panic: High contrast, emergency-focused

## Test Cases

### Unit Tests
- [ ] Component renders without errors
- [ ] Props are properly applied
- [ ] Menu click handler fires
- [ ] Variant classes applied correctly
- [ ] Title and subtitle display

### Visual Tests
- [ ] Screenshot tests for each variant
- [ ] Light/dark mode screenshots
- [ ] Mobile/tablet/desktop views
- [ ] Scrolled vs non-scrolled states

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Contrast ratios meet WCAG AA

## Definition of Done

- [ ] Component created and exported
- [ ] All props working correctly
- [ ] Styling matches design specs
- [ ] Unit tests passing (>80% coverage)
- [ ] Visual regression tests created
- [ ] Accessibility audit passed
- [ ] Code reviewed and approved
- [ ] Documentation written
- [ ] No console errors or warnings

## Dependencies

- Lucide React icons
- Theme context provider
- CSS modules configuration

## Notes

- This is the foundation component for the header epic
- Must be completed before drawer and integration stories
- Consider performance with React.memo
- Ensure smooth animations on low-end devices

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
feat(header): create AppHeader component

- Add responsive header with 56px height
- Implement variant support (default, minimal, panic)
- Add menu, title, and settings sections
- Include backdrop blur and sticky positioning
- Add proper TypeScript types

Fixes: US-HDR-001
```

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Lint checks passed
- [ ] Component renders correctly
- [ ] No console errors
- [ ] Code reviewed