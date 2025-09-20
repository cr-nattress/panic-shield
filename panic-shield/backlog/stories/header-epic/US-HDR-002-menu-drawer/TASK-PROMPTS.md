# US-HDR-002: Create MenuDrawer Component - Task Prompts

## Overview
Create a slide-out menu drawer that opens from the left side with user profile, stats, navigation, and emergency contacts.

## Prerequisites
- US-HDR-001 must be complete (AppHeader component exists)

## Task 1: Create Drawer Component Structure
**Prompt**: Create `components/header/MenuDrawer.tsx` with:
- Props for isOpen, onClose, currentPage
- Portal rendering for overlay
- Drawer container with content sections
- TypeScript interfaces

```tsx
interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
}
```

**Files to create**:
- `components/header/MenuDrawer.tsx`
- `components/header/MenuDrawer.module.css`

**Acceptance**:
- [ ] Component structure created
- [ ] Props interface defined
- [ ] Renders conditionally based on isOpen

## Task 2: Implement Overlay and Container
**Prompt**: Add overlay and drawer container:
1. Semi-transparent overlay that covers entire screen
2. Drawer container 280px wide on left side
3. Click overlay to close drawer
4. Drawer content area with sections

```tsx
{isOpen && (
  <>
    <div className={styles.overlay} onClick={onClose} />
    <div className={styles.drawer}>
      {/* Content sections */}
    </div>
  </>
)}
```

**Acceptance**:
- [ ] Overlay covers full viewport
- [ ] Drawer is 280px wide
- [ ] Clicking overlay closes drawer
- [ ] Drawer on left side of screen

## Task 3: Add Profile Section
**Prompt**: Create profile section at top of drawer:
- Guest user avatar/icon
- "Guest User" text
- Streak display (hardcode "2 day streak" for now)
- Use Flame icon from lucide-react

```tsx
<div className={styles.profileSection}>
  <div className={styles.avatar}>👤</div>
  <div className={styles.profileInfo}>
    <h3>Guest User</h3>
    <div className={styles.streak}>
      <Flame size={16} />
      <span>2 day streak</span>
    </div>
  </div>
</div>
```

**Acceptance**:
- [ ] Profile section at top
- [ ] Avatar/icon displays
- [ ] Name shows "Guest User"
- [ ] Streak with flame icon

## Task 4: Add Quick Stats Section
**Prompt**: Add stats section below profile:
- "Quick Stats" heading
- Three stat items (hardcoded for now):
  - "15 logs this week"
  - "Mostly positive"
  - "Improving trend"
- Use appropriate icons

```tsx
<div className={styles.statsSection}>
  <h4>Quick Stats</h4>
  <div className={styles.statItem}>
    <span>📊</span>
    <span>15 logs this week</span>
  </div>
  {/* More stats */}
</div>
```

**Acceptance**:
- [ ] Stats section displays
- [ ] Three stat items shown
- [ ] Icons align properly
- [ ] Text is readable

## Task 5: Add Navigation Menu
**Prompt**: Create navigation menu section:
- Menu items: Achievements, Settings, Reminders, Help, About
- Use lucide-react icons (Trophy, Settings, Bell, HelpCircle, Info)
- Highlight current page if applicable
- Make items clickable (log to console for now)

```tsx
<nav className={styles.menuSection}>
  <button className={styles.menuItem}>
    <Trophy size={20} />
    <span>Achievements</span>
  </button>
  {/* More items */}
</nav>
```

**Acceptance**:
- [ ] All 5 menu items display
- [ ] Icons show correctly
- [ ] Items are clickable
- [ ] Hover states work

## Task 6: Add Emergency Contacts Section
**Prompt**: Add emergency section at bottom:
- "Emergency Support" heading
- Crisis Hotline (988) - red styling
- Emergency (911)
- Use Phone and AlertCircle icons
- Make phone numbers clickable tel: links

```tsx
<div className={styles.emergencySection}>
  <h4>Emergency Support</h4>
  <a href="tel:988" className={styles.crisisLink}>
    <Phone size={20} />
    <span>Crisis Hotline (988)</span>
  </a>
  <a href="tel:911" className={styles.emergencyLink}>
    <AlertCircle size={20} />
    <span>Emergency (911)</span>
  </a>
</div>
```

**Acceptance**:
- [ ] Emergency section at bottom
- [ ] Crisis hotline in red
- [ ] Phone links work (tel:)
- [ ] Icons display correctly

## Task 7: Add Slide Animation
**Prompt**: Implement slide-in/out animation:
- Drawer starts off-screen left (-100% transform)
- Slides in when isOpen true (0 transform)
- 300ms cubic-bezier animation
- Overlay fades in/out

```css
.drawer {
  transform: translateX(-100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer.open {
  transform: translateX(0);
}
```

**Acceptance**:
- [ ] Drawer slides in from left
- [ ] Animation is smooth
- [ ] Overlay fades in/out
- [ ] No janky movements

## Task 8: Add Keyboard Support
**Prompt**: Implement keyboard interactions:
- Press Escape key to close drawer
- Tab through menu items
- Enter/Space activate items
- Focus trap within drawer when open

```tsx
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [isOpen, onClose]);
```

**Acceptance**:
- [ ] Escape key closes drawer
- [ ] Tab navigation works
- [ ] Enter activates items
- [ ] Focus trapped in drawer

## Task 9: Prevent Body Scroll
**Prompt**: Prevent background scrolling when drawer open:
- Add/remove no-scroll class to body
- Save and restore scroll position
- Ensure smooth behavior

```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);
```

**Acceptance**:
- [ ] Body doesn't scroll when drawer open
- [ ] Scroll position preserved
- [ ] No layout shift

## Task 10: Integrate with Test Page
**Prompt**: Update test-header page to test drawer:
- Add state for menuOpen
- Pass to MenuDrawer component
- Connect AppHeader onMenuClick
- Add drawer below header

```tsx
const [menuOpen, setMenuOpen] = useState(false);

return (
  <>
    <AppHeader onMenuClick={() => setMenuOpen(true)} />
    <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    {/* Page content */}
  </>
);
```

**Acceptance**:
- [ ] Menu button opens drawer
- [ ] Overlay closes drawer
- [ ] Escape closes drawer
- [ ] All sections visible

## Verification Checklist
- [ ] Drawer opens from menu button
- [ ] All sections display correctly
- [ ] Animation smooth (test on mobile)
- [ ] Keyboard support works
- [ ] Emergency contacts clickable
- [ ] Theme support (light/dark)
- [ ] No console errors
- [ ] Body scroll prevented
- [ ] Focus management works

## Test Commands
```bash
# Run dev server
npm run dev

# Test on mobile size
# Open DevTools, toggle device toolbar
# Test at 375px width

# Test keyboard navigation
# Tab through all items
# Press Escape to close
```

## Common Issues & Solutions

**Issue**: Drawer not appearing
**Solution**: Check z-index is high enough (z-index: 200)

**Issue**: Body still scrolls
**Solution**: Ensure overflow hidden applied to body element

**Issue**: Animation janky
**Solution**: Use transform instead of left position

## Next Story
Once complete, move to US-HDR-003 to integrate the header and drawer into the main app layout.