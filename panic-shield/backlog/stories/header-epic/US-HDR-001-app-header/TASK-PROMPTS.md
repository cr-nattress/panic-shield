# US-HDR-001: Create AppHeader Component - Task Prompts

## Overview
Create the foundational header component that will appear across all pages of the application.

## Task 1: Create Component Structure
**Prompt**: Create a new TypeScript React component called `AppHeader` in `components/header/AppHeader.tsx` with the following:
- Props interface accepting title, subtitle, variant, onMenuClick, hideMenu, hideSettings
- Three variants: 'default', 'minimal', 'panic'
- Semantic HTML header element
- Export the component

**Files to create**:
- `components/header/AppHeader.tsx`
- `components/header/AppHeader.module.css`

**Acceptance**:
- [ ] Component compiles without errors
- [ ] TypeScript types properly defined
- [ ] Component exports correctly

## Task 2: Implement Header Layout
**Prompt**: Inside AppHeader, create a three-section layout:
1. Left section: Menu button (hamburger icon using Menu from lucide-react)
2. Center section: App title "Emotion Tracker" with optional subtitle
3. Right section: Placeholder divs for theme toggle and settings buttons

Structure:
```tsx
<header className={styles.appHeader}>
  <div className={styles.headerLeft}>
    {/* Menu button */}
  </div>
  <div className={styles.headerCenter}>
    {/* Title and subtitle */}
  </div>
  <div className={styles.headerRight}>
    {/* Theme and settings placeholders */}
  </div>
</header>
```

**Acceptance**:
- [ ] Three sections properly aligned
- [ ] Menu button clickable
- [ ] Title displays correctly
- [ ] Subtitle shows when provided

## Task 3: Add Base Styling
**Prompt**: Create CSS module styles for the header:
- Fixed height of 56px
- Sticky positioning at top
- Flexbox layout with space-between
- Background with backdrop blur
- Border bottom 1px
- Z-index 100 for staying above content
- Theme-aware colors using CSS variables

```css
.appHeader {
  position: sticky;
  top: 0;
  height: 56px;
  /* Add remaining styles */
}
```

**Acceptance**:
- [ ] Header is exactly 56px tall
- [ ] Stays at top when scrolling
- [ ] Has backdrop blur effect
- [ ] Proper spacing between sections

## Task 4: Implement Variant Styles
**Prompt**: Add variant-specific styles:
1. **Default**: Full opacity, all elements visible
2. **Minimal**: Reduced opacity, simplified layout
3. **Panic**: High contrast white/red, larger text, emergency focus

Use CSS module composition:
```css
.appHeader.panic {
  background: rgba(255, 59, 48, 0.95);
  color: white;
}
```

**Acceptance**:
- [ ] Default variant looks normal
- [ ] Minimal variant is simplified
- [ ] Panic variant has high contrast
- [ ] Smooth transitions between variants

## Task 5: Add Icon Buttons
**Prompt**: Implement the menu button and placeholder buttons:
- Use lucide-react icons (Menu, Moon, Settings)
- Minimum touch target 44px
- Hover/active states
- Proper ARIA labels
- Click handler for menu button calls onMenuClick prop

**Acceptance**:
- [ ] Menu button fires onMenuClick
- [ ] All buttons have 44px touch targets
- [ ] Hover states work
- [ ] ARIA labels present

## Task 6: Create Test Page
**Prompt**: Create a test page to verify the header works:
- Create `app/test-header/page.tsx`
- Render AppHeader with different props
- Add buttons to test variant switching
- Add long content to test sticky behavior

**Acceptance**:
- [ ] Test page renders header
- [ ] Can switch between variants
- [ ] Header stays fixed when scrolling
- [ ] All props work correctly

## Task 7: Add Theme Support
**Prompt**: Make header respect light/dark theme:
- Use CSS variables from globals.css
- Different backgrounds for light/dark
- Ensure text remains readable
- Icons adapt to theme

**Acceptance**:
- [ ] Header looks good in light mode
- [ ] Header looks good in dark mode
- [ ] Text contrast meets WCAG AA
- [ ] Icons visible in both themes

## Verification Checklist
Before marking complete:
- [ ] Component renders on test page
- [ ] All three variants work
- [ ] Sticky positioning works
- [ ] Menu button clickable
- [ ] Theme support working
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Mobile responsive (test at 320px, 375px, 768px)

## Test Commands
```bash
# Run the app and navigate to test page
npm run dev
# Open http://localhost:3000/test-header

# Type check
npm run type-check

# Lint check
npm run lint
```

## Common Issues & Solutions

**Issue**: Header not sticky
**Solution**: Ensure parent containers don't have overflow hidden

**Issue**: Blur not working
**Solution**: Add -webkit-backdrop-filter for Safari

**Issue**: Menu button not firing
**Solution**: Check onMenuClick prop is passed correctly

## Next Story
Once complete, move to US-HDR-002 to create the MenuDrawer component that will slide out when the menu button is clicked.