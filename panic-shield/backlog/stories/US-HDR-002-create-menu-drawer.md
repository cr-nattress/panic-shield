# User Story: Create MenuDrawer Component

**Story ID**: US-HDR-002
**Epic**: EP-008-Application-Header
**Priority**: P0 (Critical)
**Points**: 8
**Status**: Ready

## Description

As a user, I want a slide-out menu drawer so that I can access my profile, stats, settings, and emergency contacts from any page in the app.

## Acceptance Criteria

### Functional Requirements
- [ ] Drawer slides in from left side
- [ ] Overlay covers main content when open
- [ ] Closes on overlay click
- [ ] Closes on Escape key press
- [ ] Contains profile section with avatar/initial
- [ ] Shows current streak with fire icon
- [ ] Displays quick stats (logs, trends)
- [ ] Lists navigation menu items
- [ ] Emergency contacts always visible at bottom
- [ ] Smooth open/close animations (300ms)

### Visual Requirements
- [ ] Drawer width: 280px
- [ ] Full height of viewport
- [ ] Semi-transparent overlay (rgba(0,0,0,0.5))
- [ ] White background (light mode)
- [ ] Dark gray background (dark mode)
- [ ] Proper spacing between sections
- [ ] Emergency section has red accent

### Technical Requirements
- [ ] Focus trap when open
- [ ] Restore focus on close
- [ ] Portal rendering for overlay
- [ ] Prevent body scroll when open
- [ ] Touch gestures for mobile (swipe to close)
- [ ] Memoized for performance

## Implementation Tasks

### 1. Create Drawer Component
```typescript
// components/header/MenuDrawer.tsx
interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  user?: UserProfile;
}
```

### 2. Implement Drawer Structure
```tsx
<Portal>
  {isOpen && (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-container">
        <div className="drawer-content">
          <DrawerProfile user={user} />
          <DrawerStats />
          <DrawerMenu currentPage={currentPage} />
          <EmergencyContacts />
        </div>
      </div>
    </>
  )}
</Portal>
```

### 3. Add Profile Section
```tsx
// components/header/DrawerProfile.tsx
<div className="drawer-profile">
  <div className="avatar">{user?.initial || '👤'}</div>
  <div className="profile-info">
    <h3>{user?.name || 'Guest User'}</h3>
    <div className="streak">
      <Flame size={16} />
      <span>{streak} day streak</span>
    </div>
  </div>
</div>
```

### 4. Add Quick Stats
```tsx
// components/header/DrawerStats.tsx
<div className="drawer-stats">
  <h4>Quick Stats</h4>
  <div className="stat-item">
    <span>📊</span>
    <span>{weeklyLogs} logs this week</span>
  </div>
  <div className="stat-item">
    <span>😊</span>
    <span>Mostly {dominantEmotion}</span>
  </div>
  <div className="stat-item">
    <span>📈</span>
    <span>{trend} trend</span>
  </div>
</div>
```

### 5. Add Navigation Menu
```tsx
// components/header/DrawerMenu.tsx
<nav className="drawer-menu">
  <MenuItem icon={Trophy} label="Achievements" />
  <MenuItem icon={Settings} label="Settings" />
  <MenuItem icon={Bell} label="Reminders" />
  <MenuItem icon={HelpCircle} label="Help & Support" />
  <MenuItem icon={Info} label="About" />
</nav>
```

### 6. Add Emergency Contacts
```tsx
// components/header/EmergencyContacts.tsx
<div className="drawer-emergency">
  <h4>Emergency Support</h4>
  <a href="tel:988" className="emergency-item crisis">
    <Phone size={20} />
    <span>Crisis Hotline (988)</span>
  </a>
  <a href="tel:911" className="emergency-item">
    <AlertCircle size={20} />
    <span>Emergency (911)</span>
  </a>
</div>
```

### 7. Implement Animations
```css
.drawer-container {
  transform: translateX(-100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-container.open {
  transform: translateX(0);
}

.drawer-overlay {
  opacity: 0;
  transition: opacity 300ms ease;
}

.drawer-overlay.visible {
  opacity: 1;
}
```

## Test Cases

### Unit Tests
- [ ] Drawer opens when isOpen is true
- [ ] Drawer closes on overlay click
- [ ] Drawer closes on Escape key
- [ ] Focus trap works correctly
- [ ] Profile section displays user data
- [ ] Stats calculate correctly
- [ ] Emergency contacts have correct links

### Integration Tests
- [ ] Drawer opens from header menu button
- [ ] Navigation items work correctly
- [ ] Theme changes apply to drawer
- [ ] Drawer state persists during navigation

### Accessibility Tests
- [ ] Focus management works correctly
- [ ] Keyboard navigation complete
- [ ] Screen reader announcements
- [ ] ARIA attributes present
- [ ] Touch targets minimum 44px

## Definition of Done

- [ ] Component created with all sections
- [ ] Animations smooth and performant
- [ ] Focus trap implemented
- [ ] Keyboard navigation working
- [ ] Touch gestures implemented
- [ ] Unit tests passing (>80% coverage)
- [ ] Accessibility audit passed
- [ ] Code reviewed and approved
- [ ] Documentation written

## Dependencies

- Portal component for overlay rendering
- User context for profile data
- Stats hooks for quick stats
- Emergency contact configuration

## Notes

- Consider lazy loading drawer content
- Ensure smooth performance on low-end devices
- Test swipe gestures on various mobile devices
- Emergency contacts should be prominently styled

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
feat(header): create MenuDrawer component

- Add slide-out drawer with overlay
- Implement profile section with streak
- Add quick stats display
- Include navigation menu items
- Add emergency contacts section
- Implement focus trap and keyboard nav

Fixes: US-HDR-002
```

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Animations smooth
- [ ] Focus trap working
- [ ] Emergency contacts visible
- [ ] Code reviewed