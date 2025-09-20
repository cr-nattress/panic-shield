# US-HDR-004: Move Theme Toggle to Header - Task Prompts

## Overview
Migrate the theme toggle from HomePage to the AppHeader component, making it accessible from all pages.

## Prerequisites
- US-HDR-001, US-HDR-002, US-HDR-003 complete
- Header integrated into layout

## Task 1: Locate Current Theme Toggle
**Prompt**: Find and understand the current ThemeToggle implementation:
1. Open `components/ThemeToggle.tsx`
2. Note how it works (likely uses a context or localStorage)
3. Find where it's used in HomePage
4. Check if it has any dependencies

**Acceptance**:
- [ ] Found ThemeToggle component
- [ ] Understand how it works
- [ ] Located usage in HomePage
- [ ] Identified dependencies

## Task 2: Add Theme Toggle to AppHeader
**Prompt**: Import and add ThemeToggle to AppHeader:
1. Import ThemeToggle component
2. Add it to the right section of header
3. Position between title and settings placeholder

```tsx
// In AppHeader.tsx
import ThemeToggle from '@/components/ThemeToggle';

// In header right section:
<div className={styles.headerRight}>
  <ThemeToggle />
  {!hideSettings && (
    <button className={styles.settingsButton}>
      <Settings size={20} />
    </button>
  )}
</div>
```

**Acceptance**:
- [ ] Theme toggle imported
- [ ] Displays in header
- [ ] Positioned correctly
- [ ] Click functionality works

## Task 3: Remove from HomePage
**Prompt**: Remove ThemeToggle from HomePage:
1. Open `components/HomePage.tsx`
2. Remove ThemeToggle import
3. Remove ThemeToggle component from render
4. Clean up any related code

**Acceptance**:
- [ ] Import removed
- [ ] Component removed from render
- [ ] No broken references
- [ ] HomePage still works

## Task 4: Test Theme Switching
**Prompt**: Verify theme switching works from all pages:
1. Start on home page
2. Toggle theme - verify it switches
3. Navigate to log page
4. Toggle theme - verify it works
5. Test on all other pages
6. Verify theme persists on refresh

**Acceptance**:
- [ ] Theme toggles on home
- [ ] Theme toggles on log
- [ ] Theme toggles on trends
- [ ] Theme toggles on achievements
- [ ] Theme persists on refresh

## Task 5: Style Theme Toggle in Header
**Prompt**: Ensure theme toggle looks good in header:
1. Add proper spacing
2. Ensure icon size is consistent
3. Add hover state
4. Test in both light and dark modes

```css
/* In AppHeader.module.css */
.headerRight {
  display: flex;
  align-items: center;
  gap: 8px;
}

.headerRight button {
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.headerRight button:hover {
  background: var(--secondary);
}
```

**Acceptance**:
- [ ] Proper spacing between buttons
- [ ] Icons aligned vertically
- [ ] Hover states work
- [ ] Looks good in both themes

## Task 6: Handle Panic Mode Variant
**Prompt**: Ensure theme toggle appropriate for panic mode:
1. Check if theme toggle should show in panic variant
2. If yes, ensure it's visible (white icon on red background)
3. If no, hide it when variant is 'panic'

```tsx
// Conditionally show based on variant
{variant !== 'panic' && <ThemeToggle />}
```

**Acceptance**:
- [ ] Decision made about panic mode
- [ ] Implementation matches decision
- [ ] Visual check in panic mode
- [ ] No accessibility issues

## Verification Checklist
- [ ] Theme toggle in header on all pages
- [ ] Removed from HomePage
- [ ] Theme switching works everywhere
- [ ] Theme persists on refresh
- [ ] Looks good in both themes
- [ ] Mobile responsive
- [ ] No console errors

## Next Story
Move to US-HDR-005 to migrate settings access to the header.