# Application Header - Master Verification Checklist

## Overview
This checklist ensures the header and menu drawer work correctly across all pages and scenarios.

## Pre-Implementation Baseline
Take screenshots of current state before starting:
- [ ] Home page screenshot
- [ ] Log page screenshot
- [ ] Trends page screenshot
- [ ] Achievements page screenshot
- [ ] Panic page screenshot
- [ ] Settings modal screenshot

## Component Testing

### AppHeader Component (US-HDR-001)
- [ ] Renders without errors
- [ ] Shows "Emotion Tracker" title
- [ ] Displays subtitle when provided
- [ ] Menu button visible and clickable
- [ ] 56px height maintained
- [ ] Sticky positioning works
- [ ] Backdrop blur effect visible
- [ ] Theme colors applied correctly

### MenuDrawer Component (US-HDR-002)
- [ ] Opens when triggered
- [ ] Slides in from left smoothly
- [ ] Overlay covers background
- [ ] Closes on overlay click
- [ ] Closes on Escape key
- [ ] Profile section displays
- [ ] Stats section shows data
- [ ] Menu items clickable
- [ ] Emergency contacts at bottom
- [ ] Body scroll prevented when open

## Page Integration Testing

### Home Page
- [ ] Header displays correctly
- [ ] Subtitle shows "Check In"
- [ ] Menu opens drawer
- [ ] Theme toggle works
- [ ] Settings accessible
- [ ] No duplicate controls
- [ ] Content not hidden under header
- [ ] Bottom nav still works

### Log Page
- [ ] Header displays correctly
- [ ] Subtitle shows "Track Emotion"
- [ ] Back button removed
- [ ] Menu drawer works
- [ ] Emotion wheel not affected
- [ ] Form submission works
- [ ] No layout issues

### Trends Page
- [ ] Header displays correctly
- [ ] Subtitle shows "Your Insights"
- [ ] Back button removed
- [ ] Charts display properly
- [ ] Scrolling works correctly
- [ ] Menu drawer accessible

### Achievements Page
- [ ] Header displays correctly
- [ ] Subtitle shows "Progress"
- [ ] Back button removed
- [ ] Achievement cards visible
- [ ] Streak display works
- [ ] Menu drawer opens

### Panic Page
- [ ] Header shows panic variant (red)
- [ ] Subtitle shows "Crisis Support"
- [ ] Emergency call button visible
- [ ] Simplified header layout
- [ ] High contrast achieved
- [ ] Exercises still work
- [ ] Emergency contacts prioritized

## Feature Migration Testing

### Theme Toggle (US-HDR-004)
- [ ] Removed from HomePage
- [ ] Added to header
- [ ] Works on all pages
- [ ] Theme persists on refresh
- [ ] Both themes look good
- [ ] Icon changes appropriately

### Settings Access (US-HDR-005)
- [ ] Removed from HomePage
- [ ] Added to header
- [ ] Modal opens from header
- [ ] Settings persist
- [ ] Works on all pages

### Quick Stats (US-HDR-006)
- [ ] Real data displayed
- [ ] Updates on new logs
- [ ] Streak calculates correctly
- [ ] Trend analysis works
- [ ] Responsive layout

## Special Cases Testing

### Panic Mode Variant (US-HDR-007)
- [ ] Red background applied
- [ ] White text visible
- [ ] Emergency button prominent
- [ ] Simplified layout active
- [ ] High contrast (7:1 ratio)
- [ ] Returns to normal on navigation

### Full-Screen Exercises (US-HDR-008)
- [ ] Header hides during breathing
- [ ] Header hides during grounding
- [ ] Close button still visible
- [ ] Returns when exercise ends
- [ ] No layout jumping

### Emergency Contacts (US-HDR-009)
- [ ] 988 crisis hotline works
- [ ] 911 emergency works
- [ ] Custom contacts supported
- [ ] Red styling applied
- [ ] Tel: links functional
- [ ] Prominent in drawer

## Quality Checks

### Animations (US-HDR-010)
- [ ] Drawer slide smooth (300ms)
- [ ] No janky movements
- [ ] Overlay fade works
- [ ] Button hover states
- [ ] Ripple effects (optional)
- [ ] 60fps maintained

### Accessibility (US-HDR-011)
- [ ] All ARIA labels present
- [ ] Keyboard navigation complete
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Contrast ratios met (4.5:1 normal, 7:1 panic)
- [ ] Focus trap in drawer
- [ ] Escape key works

### Responsive Design (US-HDR-012)
- [ ] 320px width (small phone)
- [ ] 375px width (iPhone SE)
- [ ] 390px width (iPhone 12)
- [ ] 414px width (large phone)
- [ ] 768px width (tablet)
- [ ] 1024px width (desktop)
- [ ] Landscape orientation
- [ ] No text overflow
- [ ] Touch targets 44px minimum

## Cross-Browser Testing

### Chrome
- [ ] Header displays correctly
- [ ] Animations smooth
- [ ] All features work

### Safari
- [ ] Backdrop filter works (-webkit prefix)
- [ ] Animations smooth
- [ ] Tel: links work

### Firefox
- [ ] Header displays correctly
- [ ] All features work
- [ ] No console errors

### Mobile Safari (iOS)
- [ ] Touch gestures work
- [ ] Bounce scroll handled
- [ ] Phone links work

### Chrome Mobile (Android)
- [ ] Touch targets adequate
- [ ] Back button handled
- [ ] Phone links work

## Performance Testing

### Load Time
- [ ] Header renders immediately
- [ ] No layout shift (CLS)
- [ ] Under 100ms interaction

### Runtime Performance
- [ ] 60fps animations
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] Quick drawer open/close

### Bundle Size
- [ ] Header component < 10KB
- [ ] Drawer component < 15KB
- [ ] CSS < 5KB combined

## User Flow Testing

### Complete Navigation Flow
1. [ ] Start on home page
2. [ ] Open menu drawer
3. [ ] Navigate to achievements via drawer
4. [ ] Navigate to log via bottom nav
5. [ ] Log an emotion
6. [ ] Navigate to trends
7. [ ] Navigate to panic mode
8. [ ] Use emergency call
9. [ ] Return to home

### Settings Flow
1. [ ] Open settings from header
2. [ ] Change a setting
3. [ ] Close modal
4. [ ] Navigate to another page
5. [ ] Open settings again
6. [ ] Verify setting persisted

### Theme Switch Flow
1. [ ] Start in light mode
2. [ ] Toggle to dark mode
3. [ ] Navigate all pages
4. [ ] Refresh browser
5. [ ] Verify theme persisted

### Crisis Flow
1. [ ] Navigate to panic page
2. [ ] See red header
3. [ ] Click emergency call
4. [ ] Open drawer
5. [ ] See emergency contacts first
6. [ ] Navigate away
7. [ ] Header returns to normal

## Regression Testing

### Existing Features Still Work
- [ ] Bottom navigation functional
- [ ] Emotion logging works
- [ ] Trends charts display
- [ ] Achievements calculate
- [ ] Settings persist
- [ ] Theme switching works
- [ ] Panic exercises function
- [ ] Data saves correctly

### No Visual Regressions
- [ ] Compare before/after screenshots
- [ ] Check spacing consistency
- [ ] Verify color accuracy
- [ ] Ensure font consistency
- [ ] Check icon alignment

## Documentation Checks
- [ ] README updated
- [ ] Component docs written
- [ ] Props documented
- [ ] CSS variables listed
- [ ] Accessibility notes added
- [ ] Browser support noted

## Final Sign-off
- [ ] All stories complete
- [ ] All tests passing
- [ ] No console errors
- [ ] No console warnings
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Responsive on all devices
- [ ] Code reviewed
- [ ] Ready for production

## Post-Implementation
- [ ] Monitor for issues
- [ ] Gather user feedback
- [ ] Track performance metrics
- [ ] Document lessons learned
- [ ] Plan future enhancements