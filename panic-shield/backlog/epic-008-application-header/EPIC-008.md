# Epic: Application Header with Menu Drawer

**Epic ID**: EP-008
**Priority**: High
**Estimated Effort**: 7-10 days
**Status**: Ready for Development

## Executive Summary

Implement a unified application header with hamburger menu drawer to provide consistent navigation, app identity, and universal access to settings across all pages. This will replace inconsistent back buttons and provide a professional mobile app experience.

## Problem Statement

### Current Issues
1. **Inconsistent Navigation**: Mix of bottom nav and individual back buttons on different pages
2. **No App Identity**: Missing consistent branding and app name visibility
3. **Limited Feature Access**: Settings and theme toggle only accessible from home page
4. **Redundant UI Elements**: Back buttons duplicate bottom navigation functionality
5. **Poor Emergency Access**: Crisis resources not easily reachable from all pages

### Impact
- Users lose context when navigating between pages
- Settings changes require returning to home page
- App feels unprofessional and fragmented
- Emergency resources harder to find in crisis

## Proposed Solution

### Application Header (56px height)
```
[≡] Emotion Tracker     [☾] [⚙]
├── Menu Drawer         ├── Theme Toggle
├── App Name           └── Settings
└── Context Subtitle
```

### Menu Drawer Contents
- User profile with streak display
- Quick stats dashboard
- Navigation links (Achievements, Settings, Help)
- Emergency contacts section (always at bottom)

## Success Criteria

### Functional Requirements
- [ ] Header visible on all main pages (Home, Log, Trends, Achievements)
- [ ] Menu drawer slides in from left with overlay
- [ ] Theme toggle accessible from every page
- [ ] Settings accessible from every page
- [ ] Emergency contacts always available in drawer
- [ ] Panic mode shows simplified header
- [ ] Header hides during full-screen exercises

### Non-Functional Requirements
- [ ] WCAG AA accessibility compliance
- [ ] Smooth animations (60fps)
- [ ] Response time < 100ms for interactions
- [ ] Works on all screen sizes (mobile-first)
- [ ] Keyboard navigable
- [ ] Screen reader compatible

## User Stories

### Phase 1: Core Components (Days 1-3)

#### US-HDR-001: Create AppHeader Component
**Priority**: P0 (Critical)
**Points**: 5
- Create responsive header component
- Add menu, title, theme toggle, settings icons
- Implement sticky positioning
- Support variant props (default, minimal, panic)

#### US-HDR-002: Create MenuDrawer Component
**Priority**: P0 (Critical)
**Points**: 8
- Build slide-in drawer with overlay
- Add profile section with streak
- Include navigation menu items
- Add emergency contacts section
- Implement focus trap and keyboard navigation

#### US-HDR-003: Integrate Header into Layout
**Priority**: P0 (Critical)
**Points**: 5
- Add header to main app layout
- Connect menu drawer state
- Update page padding for header height
- Remove redundant back buttons from pages

### Phase 2: Feature Integration (Days 4-5)

#### US-HDR-004: Move Theme Toggle to Header
**Priority**: P1 (High)
**Points**: 3
- Extract theme toggle from HomePage
- Add to header right section
- Ensure theme persists across pages
- Update all theme-dependent styles

#### US-HDR-005: Move Settings Access to Header
**Priority**: P1 (High)
**Points**: 3
- Extract settings from HomePage
- Add settings icon to header
- Open settings modal from any page
- Maintain settings state globally

#### US-HDR-006: Add Quick Stats to Drawer
**Priority**: P2 (Medium)
**Points**: 5
- Calculate weekly log count
- Show emotion trends
- Display current streak
- Add mini charts/sparklines

### Phase 3: Special Cases (Days 6-7)

#### US-HDR-007: Panic Mode Header Variant
**Priority**: P0 (Critical)
**Points**: 3
- Create minimal header for panic page
- Show only close and emergency call buttons
- Use high contrast colors
- Larger touch targets (min 56px)

#### US-HDR-008: Full-Screen Exercise Handling
**Priority**: P1 (High)
**Points**: 3
- Hide header during breathing exercises
- Hide header during grounding exercises
- Show minimal close button
- Smooth transition animations

#### US-HDR-009: Emergency Contacts Section
**Priority**: P0 (Critical)
**Points**: 5
- Add crisis hotline (988)
- Include local emergency (911)
- Add custom contacts option
- Style with high visibility red accents

### Phase 4: Polish & Accessibility (Days 8-10)

#### US-HDR-010: Animations and Transitions
**Priority**: P2 (Medium)
**Points**: 3
- Smooth drawer slide animation (300ms)
- Header shadow on scroll
- Ripple effects on buttons
- Loading states for async operations

#### US-HDR-011: Accessibility Audit
**Priority**: P1 (High)
**Points**: 5
- Add ARIA labels and roles
- Implement keyboard shortcuts (Esc to close)
- Test with screen readers
- Ensure 4.5:1 contrast ratios
- Add skip navigation link

#### US-HDR-012: Responsive Design
**Priority**: P1 (High)
**Points**: 3
- Test on mobile devices (320px-480px)
- Adjust for tablets (480px-768px)
- Enhance for desktop (>768px)
- Handle landscape orientation

## Technical Architecture

### Component Structure
```
components/
├── header/
│   ├── AppHeader.tsx          # Main header component
│   ├── MenuDrawer.tsx         # Slide-out drawer
│   ├── DrawerProfile.tsx      # User section
│   ├── DrawerStats.tsx        # Quick stats
│   ├── DrawerMenu.tsx         # Navigation items
│   └── EmergencyContacts.tsx  # Crisis resources
├── layout/
│   └── AppLayout.tsx          # Updated layout wrapper
```

### State Management
```typescript
// contexts/UIContext.tsx
interface UIState {
  menuOpen: boolean;
  headerVariant: 'default' | 'minimal' | 'panic';
  currentPage: string;
  setMenuOpen: (open: boolean) => void;
  setHeaderVariant: (variant: HeaderVariant) => void;
}
```

### CSS Architecture
```css
/* New CSS modules */
styles/
├── header.module.css
├── drawer.module.css
└── animations.module.css

/* CSS Variables to add */
--header-height: 56px;
--header-bg: rgba(255, 255, 255, 0.95);
--drawer-width: 280px;
--overlay-bg: rgba(0, 0, 0, 0.5);
```

## Acceptance Criteria

### Definition of Done
- [ ] All user stories completed
- [ ] Unit tests written (>80% coverage)
- [ ] E2E tests for critical paths
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed and approved
- [ ] Deployed to staging
- [ ] QA sign-off received
- [ ] No regression in existing features

### Testing Requirements

#### Unit Tests
- Header component renders correctly
- Drawer opens/closes properly
- Theme toggle works
- Emergency contacts display

#### Integration Tests
- Navigation between pages maintains header
- Settings persist across pages
- Menu state resets on page change
- Panic mode shows correct variant

#### E2E Tests
- User can open menu from any page
- Theme changes apply globally
- Emergency contact links work
- Keyboard navigation complete flow

## Risks & Mitigations

### Risk 1: Breaking Existing Navigation
**Mitigation**: Implement with feature flag, gradual rollout

### Risk 2: Performance Impact
**Mitigation**: Use React.memo, lazy load drawer content

### Risk 3: Accessibility Regressions
**Mitigation**: Automated a11y testing, manual screen reader testing

### Risk 4: Mobile Device Compatibility
**Mitigation**: Test on real devices, use BrowserStack

## Dependencies

### Technical Dependencies
- React 18+ (already in use)
- Lucide icons (already in use)
- CSS modules support (already configured)

### Team Dependencies
- Design review and approval
- QA test plan creation
- DevOps for feature flag setup

## Success Metrics

### Quantitative Metrics
- Time to access settings: <2 seconds from any page
- Menu drawer open time: <300ms
- Theme toggle response: <100ms
- Test coverage: >80%
- Lighthouse accessibility score: >95

### Qualitative Metrics
- User feedback on navigation improvements
- Reduced support tickets about finding settings
- Improved app store ratings mentioning UI
- Designer satisfaction with implementation

## Implementation Notes

### Do's
- Keep animations smooth and purposeful
- Ensure emergency contacts are always visible in drawer
- Test on real devices, not just browser
- Follow existing code patterns and styles

### Don'ts
- Don't break existing bottom navigation
- Don't hide critical actions behind menu
- Don't use custom icons - stick to Lucide
- Don't over-animate - keep it subtle

## Future Enhancements

After this epic is complete, consider:
1. User authentication and profiles
2. Notification center in header
3. Search functionality
4. Breadcrumb navigation for desktop
5. Customizable quick actions
6. Gesture controls (swipe to open drawer)

## References

- [Design Mockups](../recommendations/APP-HEADER-DESIGN.md)
- [Material Design Navigation Drawer](https://material.io/components/navigation-drawer)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/bars/navigation-bars/)
- [WCAG Navigation Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html)