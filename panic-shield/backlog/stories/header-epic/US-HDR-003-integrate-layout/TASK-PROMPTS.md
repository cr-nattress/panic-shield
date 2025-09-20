# US-HDR-003: Integrate Header into Layout - Task Prompts

## Overview
Integrate the AppHeader and MenuDrawer components into the main application layout, making them appear on all pages.

## Prerequisites
- US-HDR-001 complete (AppHeader exists)
- US-HDR-002 complete (MenuDrawer exists)

## Task 1: Add Components to Main Layout
**Prompt**: Update `app/page.tsx` to include AppHeader and MenuDrawer:
1. Import both components
2. Add state for menuOpen
3. Render AppHeader above page content
4. Render MenuDrawer with overlay
5. Connect menu button to drawer

```tsx
import AppHeader from '@/components/header/AppHeader';
import MenuDrawer from '@/components/header/MenuDrawer';

// In component:
const [menuOpen, setMenuOpen] = useState(false);
```

**Acceptance**:
- [ ] Components imported
- [ ] State for menu added
- [ ] Header renders above content
- [ ] Drawer renders with overlay

## Task 2: Update Page Container Styling
**Prompt**: Adjust app container for header:
1. Add padding-top to account for header height (56px)
2. Ensure content doesn't go under header
3. Update .app class in globals.css

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  padding-top: 56px; /* Add header height */
  padding-bottom: 72px; /* Existing bottom nav */
}
```

**Acceptance**:
- [ ] Content starts below header
- [ ] No overlap with header
- [ ] Scroll behavior correct
- [ ] Bottom nav still works

## Task 3: Add Dynamic Page Subtitles
**Prompt**: Create function to get subtitle based on current page:
1. Add getPageSubtitle function
2. Map page names to subtitles
3. Pass subtitle to AppHeader

```tsx
const getPageSubtitle = (page: string) => {
  const subtitles: Record<string, string> = {
    home: 'Check In',
    log: 'Track Emotion',
    trends: 'Your Insights',
    achievements: 'Progress',
    panic: 'Crisis Support'
  };
  return subtitles[page] || '';
};

// In render:
<AppHeader
  subtitle={getPageSubtitle(currentPage)}
  onMenuClick={() => setMenuOpen(true)}
/>
```

**Acceptance**:
- [ ] Each page shows correct subtitle
- [ ] Subtitle changes on navigation
- [ ] Panic page shows "Crisis Support"
- [ ] Unknown pages handled

## Task 4: Remove Back Buttons from Pages
**Prompt**: Clean up individual page components:
1. Open LogPage.tsx, remove back button
2. Open TrendsPageRefactored.tsx, remove back button
3. Open AchievementsPageRefactored.tsx, remove back button
4. Keep page titles but remove navigation buttons

For each page, remove:
```tsx
// Remove this:
<button onClick={() => onNavigate('home')} className="back-btn">
  <ChevronLeft size={24} />
</button>
```

**Acceptance**:
- [ ] LogPage back button removed
- [ ] TrendsPage back button removed
- [ ] AchievementsPage back button removed
- [ ] Page titles still display

## Task 5: Handle Panic Page Variant
**Prompt**: Make panic page show minimal header:
1. Check if currentPage is 'panic'
2. Pass variant prop to AppHeader
3. Use 'panic' variant for panic page
4. Use 'default' for all others

```tsx
<AppHeader
  subtitle={getPageSubtitle(currentPage)}
  variant={currentPage === 'panic' ? 'panic' : 'default'}
  onMenuClick={() => setMenuOpen(true)}
/>
```

**Acceptance**:
- [ ] Panic page shows red header
- [ ] Other pages show normal header
- [ ] Variant switches correctly
- [ ] High contrast on panic page

## Task 6: Move Settings Modal Trigger
**Prompt**: Since settings will move to header, prepare for migration:
1. Find SettingsModal usage in HomePage
2. Move state to app level (temporarily)
3. Keep modal working until US-HDR-005

```tsx
// Move to app/page.tsx temporarily:
const [settingsOpen, setSettingsOpen] = useState(false);

// Pass down to HomePage if needed
```

**Acceptance**:
- [ ] Settings modal still opens
- [ ] State at app level
- [ ] Ready for header integration
- [ ] No functionality lost

## Task 7: Move Theme Toggle (Temporary)
**Prompt**: Prepare theme toggle for header migration:
1. Keep ThemeToggle in HomePage for now
2. Note location for US-HDR-004
3. Ensure it still works

**Note**: Full migration happens in US-HDR-004

**Acceptance**:
- [ ] Theme toggle still visible
- [ ] Theme switching works
- [ ] Ready for migration
- [ ] No visual changes yet

## Task 8: Test All Page Navigation
**Prompt**: Verify header works on all pages:
1. Start on home page - check header
2. Navigate to log page - check header updates
3. Navigate to trends - check subtitle
4. Navigate to achievements - verify
5. Open panic mode - check red variant
6. Use bottom nav to navigate

**Test checklist for each page**:
- Title shows "Emotion Tracker"
- Correct subtitle displays
- Menu button works
- Drawer opens/closes
- No visual issues

**Acceptance**:
- [ ] Home page header correct
- [ ] Log page header correct
- [ ] Trends page header correct
- [ ] Achievements header correct
- [ ] Panic page variant works

## Task 9: Verify Mobile Responsiveness
**Prompt**: Test on mobile viewport sizes:
1. Open DevTools device toolbar
2. Test at 320px width (small phone)
3. Test at 375px width (iPhone)
4. Test at 414px width (large phone)
5. Check header doesn't break
6. Ensure drawer works on mobile

**Acceptance**:
- [ ] Header fits at 320px
- [ ] Text doesn't overflow
- [ ] Menu button accessible
- [ ] Drawer full height
- [ ] Touch targets work

## Task 10: Add Header Context (Optional)
**Prompt**: Create context for header state:
1. Create `contexts/UIContext.tsx`
2. Add menuOpen state
3. Add header variant state
4. Wrap app with provider

```tsx
interface UIContextType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  headerVariant: 'default' | 'minimal' | 'panic';
  setHeaderVariant: (variant: string) => void;
}
```

**Acceptance**:
- [ ] Context created
- [ ] State managed globally
- [ ] Components use context
- [ ] Cleaner prop passing

## Verification Checklist
- [ ] Header appears on all pages
- [ ] Correct subtitles show
- [ ] Menu drawer works everywhere
- [ ] Panic variant displays
- [ ] Back buttons removed
- [ ] No layout issues
- [ ] Mobile responsive
- [ ] Bottom nav still works
- [ ] No console errors

## Test Scenarios
1. **Full Navigation Test**:
   - Start on home
   - Visit each page via bottom nav
   - Verify header on each
   - Open drawer on each page

2. **Panic Mode Test**:
   - Navigate to panic
   - Verify red header
   - Check drawer still works
   - Return to normal page

3. **Mobile Test**:
   - Set viewport to 375px
   - Navigate all pages
   - Open/close drawer
   - Check touch targets

## Common Issues & Solutions

**Issue**: Content goes under header
**Solution**: Check padding-top on .app class

**Issue**: Header disappears on navigation
**Solution**: Ensure header outside page components

**Issue**: Drawer state lost on navigation
**Solution**: State should be at app level, not page level

## Next Story
Once complete, move to US-HDR-004 to migrate the theme toggle to the header.