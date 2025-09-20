# US-HDR-007: Panic Mode Header Variant - Task Prompts

## Overview
Create a special high-contrast, minimal header variant specifically for the panic/crisis page to reduce cognitive load during distress.

## Prerequisites
- Header component exists and integrated
- Panic page accessible via navigation

## Task 1: Review Panic Page Requirements
**Prompt**: Understand the panic page context:
1. Navigate to panic page in app
2. Note the emergency nature of content
3. Observe current color scheme (purple gradient)
4. Consider user's mental state (distressed)

**Key considerations**:
- User is in crisis
- Need maximum clarity
- Minimal distractions
- Emergency contacts priority

**Acceptance**:
- [ ] Visited panic page
- [ ] Understand use case
- [ ] Noted current design
- [ ] Ready to implement variant

## Task 2: Enhance Panic Variant Styles
**Prompt**: Create high-contrast panic variant styling:
1. Open `AppHeader.module.css`
2. Add panic variant with red/white theme
3. Larger text for clarity
4. Higher contrast borders

```css
.appHeader.panic {
  background: rgba(239, 68, 68, 0.98); /* Semi-transparent red */
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
}

.appHeader.panic .headerTitle {
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.appHeader.panic button {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.appHeader.panic button:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Acceptance**:
- [ ] Red background applied
- [ ] White text visible
- [ ] High contrast achieved
- [ ] Buttons clearly visible

## Task 3: Simplify Header Content
**Prompt**: Reduce elements in panic variant:
1. Hide non-essential buttons
2. Show only menu and emergency call
3. Simplify title to just "Crisis Support"

```tsx
// In AppHeader.tsx
{variant === 'panic' ? (
  <div className={styles.headerRight}>
    <button className={styles.emergencyCall} onClick={() => window.location.href = 'tel:988'}>
      <Phone size={24} />
      <span>Call 988</span>
    </button>
  </div>
) : (
  <div className={styles.headerRight}>
    <ThemeToggle />
    <SettingsButton />
  </div>
)}
```

**Acceptance**:
- [ ] Emergency call button visible
- [ ] Non-essential items hidden
- [ ] Clear call-to-action
- [ ] Simplified layout

## Task 4: Add Emergency Call Button
**Prompt**: Create prominent emergency call button:
1. Add phone icon and "988" text
2. Make it highly visible
3. Direct dial on click
4. Pulse animation for attention

```css
.emergencyCall {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid white;
  border-radius: 20px;
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}
```

**Acceptance**:
- [ ] Emergency button prominent
- [ ] Phone number visible
- [ ] Pulse animation works
- [ ] Click initiates call

## Task 5: Update Menu Drawer for Panic Mode
**Prompt**: Adapt drawer content when on panic page:
1. Emergency contacts at top (not bottom)
2. Larger text and buttons
3. Simplified menu items
4. Red accent colors

```tsx
// In MenuDrawer.tsx
const isPanicMode = currentPage === 'panic';

{isPanicMode && (
  <div className={styles.emergencyTop}>
    {/* Emergency contacts first */}
  </div>
)}
```

**Acceptance**:
- [ ] Emergency contacts prioritized
- [ ] Larger touch targets
- [ ] Simplified options
- [ ] Crisis-appropriate styling

## Task 6: Test Panic Mode Flow
**Prompt**: Complete user flow test:
1. Navigate to panic page via bottom nav
2. Verify red header appears
3. Click emergency call button
4. Open menu drawer
5. Check emergency contacts prominent
6. Return to normal page
7. Verify header returns to normal

**Acceptance**:
- [ ] Panic variant displays
- [ ] Emergency call works
- [ ] Drawer adapted
- [ ] Smooth transitions
- [ ] Return to normal works

## Task 7: Add Larger Touch Targets
**Prompt**: Ensure all interactive elements are easily tappable:
1. Minimum 56px height for buttons
2. Extra padding around links
3. Increased spacing between elements

```css
.appHeader.panic button {
  min-height: 56px;
  min-width: 56px;
  padding: 16px;
}

.appHeader.panic .emergencyCall {
  min-height: 48px;
  padding: 12px 24px;
}
```

**Acceptance**:
- [ ] All buttons 56px+ height
- [ ] Easy to tap on mobile
- [ ] No mis-taps possible
- [ ] Comfortable spacing

## Task 8: Add Accessibility Enhancements
**Prompt**: Ensure panic mode is accessible:
1. High contrast ratios (7:1 minimum)
2. Clear focus indicators
3. Screen reader announcements
4. Reduced motion option

```tsx
// Announce page change
useEffect(() => {
  if (variant === 'panic') {
    announce('Crisis support mode activated. Emergency help available.');
  }
}, [variant]);
```

**Acceptance**:
- [ ] Contrast ratio 7:1+
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Motion respectful

## Verification Checklist
- [ ] Panic variant displays red theme
- [ ] Emergency call button works
- [ ] Simplified layout active
- [ ] High contrast achieved
- [ ] Large touch targets
- [ ] Drawer shows emergency first
- [ ] Transitions smooth
- [ ] Accessible to all users
- [ ] Returns to normal correctly

## Testing Script
1. Open app in mobile view (375px)
2. Navigate to panic page
3. Verify header changes to red
4. Try to call 988 (should prompt)
5. Open drawer - emergency at top
6. Navigate away - header normal
7. Return to panic - header red again

## Common Issues & Solutions

**Issue**: Header not changing to red
**Solution**: Check variant prop is passed correctly

**Issue**: Emergency button not working
**Solution**: Ensure tel: protocol handler works on device

**Issue**: Contrast too low
**Solution**: Use solid backgrounds, not transparency

## Next Story
Move to US-HDR-008 to handle hiding header during full-screen exercises.